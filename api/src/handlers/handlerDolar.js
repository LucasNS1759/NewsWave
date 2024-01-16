const axios = require("axios")

const getDolaresHanlder = async (req, res) => {
  try {
    const dolar = await axios.get("https://dolarapi.com/v1/dolares");
    const euro = await axios.get("https://dolarapi.com/v1/cotizaciones/eur")
    const real = await axios.get("https://dolarapi.com/v1/cotizaciones/brl")
    
    const cotizaciones = [...dolar.data].concat(euro.data).concat(real.data)
    res.status(200).json(cotizaciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDolaresHanlder };
