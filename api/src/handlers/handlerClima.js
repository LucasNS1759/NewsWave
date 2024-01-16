const axios = require("axios");
require("dotenv").config();
const { CLIMA_KEY } = process.env;

function formatearFecha(cadenaFecha) {
  const fecha = new Date(cadenaFecha);
  const opciones = { year: "2-digit", month: "short", day: "2-digit" };

  const fechaFormateada = fecha.toLocaleDateString("en-GB", opciones);
  return fechaFormateada.replace(/ /g, " ");
}

const getClimaHandler = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lang=es&lat=${latitude}&lon=${longitude}&units=metric&appid=${CLIMA_KEY}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getClimaExtendido = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lang=es&lat=${latitude}&lon=${longitude}&units=metric&appid=${CLIMA_KEY}`;

    const response = await axios.get(apiUrl);
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const weatherData = response.data.list;
    const pronosticoPorDias = {};

    weatherData.forEach((pron) => {
      const diaSemana = diasSemana[new Date(pron.dt_txt).getDay()];

      if (!pronosticoPorDias[diaSemana]) {
        pronosticoPorDias[diaSemana] = [];
      }

      pronosticoPorDias[diaSemana].push({
        dia: diaSemana,
        temperatura: pron.main.temp + "°C",
        tempMin: pron.main.temp_min + "°C",
        tempMax: pron.main.temp_max + "°C",
        sensacionTermica: pron.main.feels_like + "°C",
        humedad: pron.main.humidity + "%",
        viento: pron.wind.speed + " km/h",
        estado: pron.weather[0].description,
        diaEspecifico: formatearFecha(pron.dt_txt),
        icono: `https://openweathermap.org/img/w/${pron.weather[0].icon}.png`,
        hora:
          new Date(pron.dt_txt).getHours() < 12
            ? new Date(pron.dt_txt).getHours() + "am"
            : new Date(pron.dt_txt).getHours() + "pm",
      });
    });

    res.status(200).json(Object.values(pronosticoPorDias));
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCoordenadas = async (req, res) => {
  const { cityName, codigoDeEstado, codigoDePais } = req.query;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${codigoDeEstado},${codigoDePais}&limit=5&appid=${CLIMA_KEY}`
    );
    console.log(response.data);
    if (!response.data.length) {
      res.status(200).json(null);
      return;
    }
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getClimaHandler, getClimaExtendido, getCoordenadas };
