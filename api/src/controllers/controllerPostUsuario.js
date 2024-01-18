const { User } = require("../db.js");

const controllerPostUsuario = async (email, password) => {
  try {
    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      throw new Error(`El email ${email} ya está en uso`);
    } else {
      await User.create({ email, password });
      return {
        response: "Usuario registrado con éxito",
      };
    }
  } catch (error) {
    throw new Error(`Error al registrar usuario: ${error.message}`);
  }
};

module.exports = controllerPostUsuario;
