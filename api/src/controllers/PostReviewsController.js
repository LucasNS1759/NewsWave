const { User } = require("../db.js");
const { Activity } = require("../db.js");
const { Review } = require("../db.js");

const PostReviewsController = async (
  calificacion,
  review,
  activityId,
  userId
) => {
  const newReview = await Review.create({ calificacion, review });

  const usuario = await User.findByPk(userId);
  const actividad = await Activity.findByPk(activityId);

  // Asociar la nueva revisión con la actividad y el usuario
  await actividad.addReview(newReview);
  await actividad.addUser(usuario);

  // Devolver la revisión con las asociaciones
  const response = await Review.findOne({
    where: { review },
    include: [
      { model: Activity, include: [{ model: Countrie }] },
      { model: User, attributes: ["id", "email"] },
    ],
  });

  return response;
};

module.exports = PostReviewsController;
