const { Countrie } = require("../db.js");
const axios = require("axios");

const saveCountriesController = async () => {
  const count = await Countrie.count();
  
  if (count > 0) {
    return;
  }

  const apiCountries = await axios.get("https://restcountries.com/v3/all");

  let response = await apiCountries.data.forEach(async (countrie) => {
    console.log(countrie.independent);
    await Countrie.findOrCreate({
      where: {
        nombreComun: countrie.name.common,
        nombreOficial: countrie.name.official,
        bandera: countrie.flags[0],
        continente: countrie.continents[0],
        capital: countrie.capital ? countrie.capital[0] : "no tiene",
        region: countrie.region,
        moneda: countrie.currencies
          ? countrie.currencies
          : { moneda: "sin especificar" },
        soberano: countrie.independent ? countrie.independent : false,

        subRegion: countrie.subregion ? countrie.subregion : "no especifica",
        paisesFronterizos: countrie.borders ? countrie.borders : ["no tiene"],
        gini: countrie.gini ? countrie.gini : { gini: "sin especificar" },
        zonaHoraria: countrie.timezones,
        googleMaps: countrie.maps.googleMaps,
        latitud: countrie.latlng,
        idioma: countrie.languages
          ? countrie.languages
          : { idioma: "sin especificar" },
        area: countrie.area,
        poblacion: countrie.population,
      },
    });
  });

  return response;
};

module.exports = saveCountriesController;
