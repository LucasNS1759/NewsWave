const { Activity } = require("../db.js");
const { Countrie } = require("../db.js");
const { User } = require("../db.js");
const { Review } = require("../db.js");

const getAllActivitiesController = async (activityId) => {
  const response = activityId
    ? await Activity.findByPk(activityId, {
        include: [
          { model: Countrie },
          { model: Review },
          { model: User, attributes: ["id", "email"] },
        ],
      })
    : await Activity.findAll({
        include: [
          { model: Countrie },
          { model: Review },
          { model: User, attributes: ["id", "email"] },
        ],
      });

  return response;
};

module.exports = getAllActivitiesController;
