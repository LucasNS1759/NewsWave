const { User } = require("../db.js");

const ControllerGetUsuario = async (email) => {
  const response = await User.findOne({ where: { email } });
  console.log(response.dataValues.id)
  return response ? response.dataValues.id : false;
};

module.exports = ControllerGetUsuario;
