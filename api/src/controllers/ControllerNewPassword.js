const { User, Reset_tokens_black_list } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const controllerNewPassword = async (
  userId,
  newPassword,
  resetPasswordToken
) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    await user.save();
    console.log(resetPasswordToken);
    // Modificar el token para que haya expirado
    const black = await Reset_tokens_black_list.create({
      tokenExpired: resetPasswordToken,
    });
    console.log(black);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = controllerNewPassword;
