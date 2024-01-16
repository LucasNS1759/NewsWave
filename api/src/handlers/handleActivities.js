const postActivitiesController = require("../controllers/postActivitiesController");
const getAllActivitiesController = require("../controllers/getAllActivitiesController.js");

const getAllActivitiesHandler = async (req, res) => {
  const { activityId } = req.query;

  try {
    const response = await getAllActivitiesController(activityId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postNewActivitiesHandler = async (req, res) => {
  const { Nombre, Dificultad, Duracion, Temporada, paisesdIds,userId } = req.body;
  try {
    const response = await postActivitiesController(
      Nombre,
      Dificultad,
      Duracion,
      Temporada,
      paisesdIds,
      userId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllActivitiesHandler,
  postNewActivitiesHandler,
};
