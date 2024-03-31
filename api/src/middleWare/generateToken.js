const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../db.js");

const resetPasswordToken = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    const response = await User.findOne({ where: { email } });
    console.log(response);
    if (!response) {
      return res.status(400).json({ error: "The user to whom I requested the password change is not registered, check that it is written correctly and try again" });
    } else {
      const token = jwt.sign({ userId: response.dataValues.id }, SECRET_KEY, {
        expiresIn: 320,
      });

      // Almacena el token en una cookie
      res.cookie("resetPasswordToken", token, {
        httpOnly: true,
        samesite: "lax",
        domain: "localhost",
        maxAge: 360 * 1000,
      });

      next();
    }
  } catch (error) {
    return res.status(400).json({ error: "Token inválido" });
  }
};
module.exports = resetPasswordToken;
