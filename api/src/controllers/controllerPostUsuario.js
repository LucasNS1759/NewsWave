const { User } = require("../db.js");

const controllerPostUsuario = async (email, password) => {
  const response = await User.create({email, password});

  return response
    ? { response: "Usuario creado con exito" }
    : { response: "Error " };
};

module.exports = controllerPostUsuario;
