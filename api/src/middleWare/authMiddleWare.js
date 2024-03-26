const jwt = require("jsonwebtoken");
const { User, Reset_tokens_black_list } = require("../db.js");
require("dotenv").config();
const { SECRET_KEY } = process.env;

// Middleware para autenticación y autorización
const authMiddleware = {
  // Middleware para verificar el token de acceso
  verifyToken: (req, res, next) => {
    const token = req.cookies.Token;

    if (!token) {
    console.log("no hay tpken")
      return res.status(401).json({ error: "Debe iniciar sesión primero" });
    }

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(400).json({ error: "Token inválido" });
    }
  },

  // Middleware para verificar el token de restablecimiento de contraseña
  verifyResetPasswordToken: async (req, res, next) => {
    const resetPasswordToken = req.cookies.resetPasswordToken;
    const { resetToken } = req.query;

    try {
      const tokenBlackList = await Reset_tokens_black_list.findOne({
        where: { tokenExpired: resetToken },
      });
      if(tokenBlackList){
        return res
        .status(401)
        .redirect(
          "http://localhost:5174/notFound/?error=token expired&status=401"
        );
      }
      const decodedToken = jwt.verify(resetToken, SECRET_KEY);
      req.user = decodedToken;

      const findUser = User.findByPk(decodedToken.userId);
      if (findUser) {
        next();
      } else {
        return res
          .status(500)
          .redirect(
            "http://localhost:5174/notFound/?error=Unregistered user&status=500"
          );
      }
    } catch (error) {
      // Captura el error de token expirado
      if (error.name === "TokenExpiredError") {
        console.log(error.name);
        res.clearCookie("resetPasswordToken", {
          httpOnly: true,
          sameSite: "Lax",
        });
        return res
          .status(401)
          .redirect(
            "http://localhost:5174/notFound/?error=token expired&status=401"
          );
      } else {
        console.log(error); // Maneja otros errores
        return res
          .status(500)
          .redirect(
            "http://localhost:5174/notFound/?error=server error&status=500"
          );
      }
    }
  },

  // Middleware para verificar el token de activación de cambio de contraseña
  verifyResetTokenActive: (req, res, next) => {
    const { resetToken } = req.query;

    if (!resetToken) {
      return res.status(400).json({ error: "Token inválido" });
    }

    try {
      const decodedToken = jwt.verify(resetToken, SECRET_KEY);
      if (!decodedToken) {
        return res.status(402).json({ error: "Token expirado" });
      } else {
        next();
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expirado" });
      }
      return res.status(400).json({ error: "Token inválido" });
    }
  },
};

module.exports = authMiddleware;
