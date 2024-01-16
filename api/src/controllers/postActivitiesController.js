const { Activity } = require("../db.js");
const { Countrie } = require("../db.js");
const { User } = require("../db.js");

const { Op } = require("sequelize");

const postActivitiesController = async (
  Nombre,
  Dificultad,
  Duracion,
  Temporada,
  paisesdIds,
  userId
) => {
  console.log(paisesdIds);
  console.log(userId);
  
  const actividadExistente = await Activity.findOne({
    where: { Nombre },
    include: [{ model: Countrie }],
  });

  const usuario = await User.findByPk(userId);

  if (actividadExistente) {
    await actividadExistente.addCountries(paisesdIds);
    console.log(actividadExistente);
  } else {
    const newActivity = await Activity.create({
      Nombre,
      Dificultad,
      Duracion,
      Temporada,
    });
    // console.log(newActivity.__proto__);
    await newActivity.addUser(usuario);
    const paises = await Countrie.findAll({
      where: {
        id: {
          [Op.in]: paisesdIds,
        },
      },
    });
    for (let i = 0; i < paises.length; i++) {
      console.log(paises[i].dataValues.id);
      const h = await newActivity.addCountries(paises);
      console.log(h);
      i++;
    }
  }

  const response = await Activity.findOne({
    where: { Nombre },
    include: [{ model: Countrie }],
    include: [{ model: User }],
  });
  
  // console.log(response)
  return response;
  //tengo un array de paises mapearlo y crear las asociasiones con las actividades q cree mas arriba
};

module.exports = postActivitiesController;
