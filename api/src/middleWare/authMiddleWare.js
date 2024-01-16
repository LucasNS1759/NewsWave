const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.Token;

  if (!token) {
    return res.status(400).json({ error: "Debe iniciar sesion Primero" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(400).json({ error: "Token Invalido" });
  }
};

module.exports = authMiddleWare;
