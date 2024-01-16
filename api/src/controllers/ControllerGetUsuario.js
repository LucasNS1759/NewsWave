const { User } = require("../db.js");

const ControllerGetUsuario = async () => {
  const response = await User.findAll();
  return response;
};

module.exports = ControllerGetUsuario;
