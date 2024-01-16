const PostReviewsController = require("../controllers/PostReviewsController")

const getAllReviewsHandler = async (req, res) => {
  try {
    const response = await allReviewsController();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postReviewsHandler = async (req, res) => {
  const { calificacion, review, activityId, userId } = req.body;
console.log(calificacion, review, activityId, userId)
  try {
    const response = await PostReviewsController(
      calificacion,
      review,
      activityId,
      userId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllReviewsHandler, postReviewsHandler };
