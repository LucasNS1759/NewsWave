const { User } = require("../db.js");

const controllerPostUsuario = async (email, password) => {
  try {
    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
    console.log(findUser)
      throw new Error(`this email ${email} is already in use`);
    } else {
      await User.create({ email, password });
      return {
        response: "Registered user successfully",
      };
    }
  } catch (error) {
    throw new Error(` ${error.message}`);
  }
};

module.exports = controllerPostUsuario;
