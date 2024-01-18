const { Router } = require("express");
const passport = require("passport");
require("../config/passportConfig.js");

const {
  handlerGetUsuario,
  handlerPostUsuario,
  handlerSuccessLogin,
} = require("../handlers/handlersUsuarios");
const authController = require("../controllers/controllerPassport.js");
const authMiddleWare = require("../middleWare/authMiddleWare.js");

const usuarioRoutes = Router();

usuarioRoutes.get("/", handlerGetUsuario);
usuarioRoutes.post("/singUp", handlerPostUsuario);
usuarioRoutes.post("/login", authController.localLogin);
usuarioRoutes.get("/login-success?", authMiddleWare, handlerSuccessLogin);
usuarioRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
usuarioRoutes.get("/auth/google/callback", authController.googleCallback);
usuarioRoutes.get("/logOut", (req, res) => {
  res.clearCookie("Token", { httpOnly: true, sameSite: "Lax" });

  // Redirige o responde de acuerdo a tus necesidades
  // Puedes redirigir al usuario a la página de inicio de sesión, por ejemplo
  res.redirect("http://localhost:5173/login");
});
// http://localhost:3001/usuario/auth/google/callback
module.exports = usuarioRoutes;
