require("dotenv").config();
const { NOTICIAS_KEY } = process.env;
const axios = require("axios");

const timeout = (ms, keyWords, category, language) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      if (keyWords) {
        reject({
          message: `Tiempo de espera agotado para la búsqueda en ${language} para la busqueda ${keyWords}`,
          status: 504,
          keyWords: keyWords,
          idioma: language,
        });
      } else if (category) {
        reject({
          message: `Tiempo de espera agotado para la búsqueda en ${language} para la categoría ${category}`,
          status: 504,
          categoria: category,
          idioma: language,
        });
      }
    }, ms);
  });
};

const handlerNoticias = async (req, res) => {
  const { keyWords, language = "es", pageSize = 3 } = req.query;

  const categories = [
    "general",
    "technology",
    "science",
    "regional",
    "world",
    "sports",
    "finance",

    "politics",
    "health",
    
  ];

  const apiBaseUrl = `https://api.currentsapi.services/v1/latest-news`;

  const getCategoryApi = (category) => {
    return `${apiBaseUrl}?keywords=${keyWords}&category=${category}&language=${language}&page_size=${pageSize}&apiKey=${NOTICIAS_KEY}`;
  };

  const categoryResponses = {};

  try {
    // Use Promise.all to concurrently fetch news for all categories

    const categoryPromises = categories.map(async (category) => {
      const api = getCategoryApi(category);
      const response = await Promise.race([
        axios.get(api),
        timeout(6000, keyWords, category, language),
      ]);
      categoryResponses[category] = response.data.news;
    });

    await Promise.all(categoryPromises);

    res.status(200).json(categoryResponses);
  } catch (error) {
    // console.error(error);

    // Handle errors
    if (keyWords) {
      res.status(504).json({
        error: `Tiempo de espera agotado para la búsqueda en ${language}`,
      });
    } else {
      // Handle category-specific errors
      const failedCategory = error.categoria || categories[0]; // Use the first category if not provided
      const fallbackApi = getCategoryApi(failedCategory).replace(
        `&language=${language}`,
        "&language=en"
      );

      try {
        const fallbackResponse = await Promise.race([
          axios.get(fallbackApi),
          timeout(6000, keyWords, failedCategory, "en"),
        ]);
        categoryResponses[failedCategory] = fallbackResponse.data.news;
        res.status(200).json(categoryResponses);
      } catch (fallbackError) {
        // console.error(fallbackError);
        res.status(504).json({ error: fallbackError.message });
      }
    }
  }
};

const handlerUltimasNoticias = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.currentsapi.services/v1/latest-news?language=es&page_size=5&apiKey=${NOTICIAS_KEY}`
    );
    res.status(200).json(response.data.news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerFullNews = async (req, res) => {
  const { category, language = "es", keyWords } = req.query;

  try {
    const response = keyWords
      ? await Promise.race([
          axios.get(
            `https://api.currentsapi.services/v1/search?keywords=${keyWords}&language=${language}&country=ar&apiKey=${NOTICIAS_KEY}`
          ),
          timeout(6000, keyWords, "", language),
        ])
      : await Promise.race([
          axios.get(
            `https://api.currentsapi.services/v1/latest-news?language=${language}&category=${category}&page_size=50&apiKey=${NOTICIAS_KEY}`
          ),
          timeout(6000, "", category, ""),
        ]);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(501).json(error);
    // console.log(error);
  }
};

module.exports = { handlerNoticias, handlerUltimasNoticias, handlerFullNews };
