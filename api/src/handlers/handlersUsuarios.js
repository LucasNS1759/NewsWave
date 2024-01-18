const ControllerGetUsuario = require("../controllers/ControllerGetUsuario");
const controllerPostUsuario = require("../controllers/controllerPostUsuario");

const handlerGetUsuario = async (req, res) => {
  try {
    const response = await ControllerGetUsuario();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerSuccessLogin = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);

  try {
    res.status(200).json({ success: true, userId: userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerPostUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await controllerPostUsuario(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerGetUsuario,
  handlerPostUsuario,
  handlerSuccessLogin,
};
