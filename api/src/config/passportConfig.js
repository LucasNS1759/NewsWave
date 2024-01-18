const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { User } = require("../db.js");
require("dotenv").config();

const { CLIENT_ID, SECRET_CLIENT } = process.env;

//Local

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
 
      try {
        const user = await User.findOne({ where: { email: email } });
        
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const match = await user.validatePassword(password);
        if (!match) {
          return done(null, false, { message: "Invalid password" });
        }
        return done(null, user);
      } catch (error) {
        console.log(error.message);
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret:SECRET_CLIENT,
      callbackURL: "https://mundo-noticia.onrender.com/usuario/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          where: { googleId: profile.id },
        });

        if (!user) {
          User.create({
            googleId: profile.id,
            nickName: profile.displayName,
            picture: profile.photos[0].value,
            email: profile.emails[0].value,
            password: Math.random().toString(36).substring(7),
          });
        }
        return done(null, user);
      } catch (error) {
      console.log(error)
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
