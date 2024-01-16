require("dotenv").config();
const OpenAi = require("openai");
const { API_KEY_SECRET } = process.env;
console.log(API_KEY_SECRET)

const openIa = new OpenAi({
  apiKey: API_KEY_SECRET,
});


module.exports = openIa;
