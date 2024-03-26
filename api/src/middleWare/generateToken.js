const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../db.js");

const resetPasswordToken = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    const response = await User.findOne({ where: { email } });
    console.log(response.dataValues.id);
    if (!response.dataValues.id) {
      return res.staus(400).json({ error: "no se encontro el usuario" });
    }

    const token = jwt.sign({ userId: response.dataValues.id }, SECRET_KEY, {
      expiresIn: 320,
    });

    // Almacena el token en una cookie
    res.cookie("resetPasswordToken", token, {
      httpOnly: true,
      Samesite: "Lax",
      domain: "localhost",
      maxAge: 360 * 1000,
    });

    next();
  } catch (error) {
    return res.status(400).json({ error: "token invalido" });
  }
};

module.exports = resetPasswordToken;
