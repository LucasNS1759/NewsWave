const { Countrie } = require("../db.js");
const { Activity } = require("../db.js");
const { User } = require("../db.js");
const { Review } = require("../db.js");


const getDetailCountrieController = async (id) => {
  const response = await Countrie.findByPk(id, {
    include: [
      {
        model: Activity,
        include: [
          { model: User, attributes: ["id", "email"] },
          { model: Review },
        ],
      },
    ],
  });
console.log(response)
  return response;
};

module.exports = getDetailCountrieController;
