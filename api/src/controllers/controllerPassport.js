const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const localLogin = (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Autenticación fallida" });

    // Genera un token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    // Almacena el token en una cookie
    res.cookie("Token", token, {
      httpOnly: true,
      SameSite: "Lax",
      domain: "localhost",
    });

    return res.redirect(
      `https://mundo-noticia.onrender.com/usuario/login-success?userId=${user.dataValues.id}`
    );
  })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err) return next(err);

    // Genera un token JWT si el usuario existe en la base de datos
    if (user.googleId) {
      const token = jwt.sign({ userId: user.id }, SECRET_KEY);

      // Almacena el token en una cookie
      res.cookie("Token", token, { httpOnly: true, SameSite: "None" });

      return res.redirect(`https://mundo-noticias22.vercel.app/HomeNoticia?login=${true}&userId=${user.dataValues.id}`);
    }
  })(req, res, next);
};

module.exports = { localLogin, googleCallback };
