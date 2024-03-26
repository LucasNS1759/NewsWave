const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const tokenExpiration = 24 * 60 * 60 * 10;

const localLogin = (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    console.log(user);
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Email no registrado" });
    if (user.password === "no match") {
      return res.status(401).json({ message: "contraseña incorrecta" });
    }

    // Genera un token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: tokenExpiration,
    });

    // Almacena el token en una cookie
    res.cookie("Token", token, {
      httpOnly: true,
      SameSite: "Lax",
      domain: "localhost",
      maxAge: tokenExpiration * 1000,
    });

    res.clearCookie("resetPasswordToken", { httpOnly: true, sameSite: "Lax" });

    return res.redirect(
      `http://localhost:3002/usuario/login-success?userId=${user.dataValues.id}`
    );
  })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err) return next(err);

    // Genera un token JWT si el usuario existe en la base de datos
    if (user.googleId) {
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: tokenExpiration,
      });

      // Almacena el token en una cookie
      res.cookie("Token", token, {
        httpOnly: true,
        SameSite: "None",
        maxAge: tokenExpiration * 1000,
      });
     
     //LIMPIA LA COOKIE PARA EL CAMBIO DE CONTRASEÑA SI SE SOLICITO EN LOGUEO LOCAL Y LUEGO SE LOGUEA EN GOOGLE 
      res.clearCookie("resetPasswordToken", {
        httpOnly: true,
        sameSite: "Lax",
      });

      return res.redirect(
        `http://localhost:5174/HomeNoticia?login=${true}&userId=${
          user.dataValues.id
        }`
      );
    }
  })(req, res, next);
};

module.exports = { localLogin, googleCallback };
