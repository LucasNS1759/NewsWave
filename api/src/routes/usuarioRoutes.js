const { Router } = require("express");
const passport = require("passport");
require("../config/passportConfig.js");

const {
  handlerGetUsuario,
  handlerPostUsuario,
  handlerSuccessLogin,
  handlerSendEmail,
  handlerResetPas,
  handlerChangePassword,
} = require("../handlers/handlersUsuarios");
const authController = require("../controllers/controllerPassport.js");
const authMiddleWare = require("../middleWare/authMiddleWare.js");
const resetPasswordToken = require("../middleWare/generateToken.js");

const usuarioRoutes = Router();

usuarioRoutes.post("/", resetPasswordToken, handlerGetUsuario);
usuarioRoutes.post("/singUp", handlerPostUsuario);
usuarioRoutes.post("/login", authController.localLogin);
usuarioRoutes.get(
  "/login-success?",
  authMiddleWare.verifyToken,
  handlerSuccessLogin
);
usuarioRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
usuarioRoutes.get("/auth/google/callback", authController.googleCallback);

usuarioRoutes.post("/sendEmailResetPassword", handlerSendEmail);
usuarioRoutes.get(
  "/resetPassword?",
  authMiddleWare.verifyResetPasswordToken,
  handlerResetPas
);
usuarioRoutes.put(
  "/changePassword?",
  authMiddleWare.verifyResetTokenActive,
  handlerChangePassword
);

usuarioRoutes.get("/logOut", (req, res) => {
  res.clearCookie("Token", { httpOnly: true, sameSite: "Lax" });
  res.redirect("http://localhost:5174/login");
});

module.exports = usuarioRoutes;
