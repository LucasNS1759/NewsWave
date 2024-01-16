const { Countrie } = require("../db.js");
const { Activity } = require("../db.js");
const { Op } = require("sequelize");

const getAllCountriesController = async (query) => {
  const {
    pagina = 0,
    tamañoDePagina = 6,
    continente,
    actividad,
    orden,
    tipoDeOrden,
    nombreComun,
  } = query;


  const offset = +pagina * +tamañoDePagina;
  const limit = +tamañoDePagina;

  const querys = {
    offset,
    limit,
    where: {},
    orden: [[orden, tipoDeOrden]],
    include: [
      // {
      //   model: Activity,
      //   where: {
      //     Nombre: actividad,
      //   },
      // },
    ],
  };

  if (!orden && !tipoDeOrden) {
    delete querys.orden;
  }
  if (continente) {
    querys.where.continente = continente;
  }
  if (nombreComun) {
    querys.where.nombreComun = { [Op.iLike]: `%${nombreComun}%` };
  }
  if (actividad) {
    querys.include.push({
      model: Activity,
      where: {
        Nombre: actividad,
      },
    });
  }


  const response = await Countrie.findAndCountAll(querys);

  return {
    count: response.count,
    totalDePaginas: Math.ceil(response.count / tamañoDePagina) - 1,
    paginaActual: pagina ? parseInt(pagina) : pagina,
    paginaAnterior: pagina <= 0 ? null : parseInt(pagina) - 1,
    siguientePagina:
      pagina >= Math.ceil(response.count / tamañoDePagina) - 1
        ? null
        : parseInt(pagina) + 1,
    tamañoDePagina: tamañoDePagina,
    data: response.rows,
  };
};

module.exports = getAllCountriesController;
