const findSubscriptionController = require("../controllers/findSubscriptionController.js");
const addNewsSubscriptionsController = require("../controllers/subscriptionController");
const unsubscribeController = require("../controllers/unsubscribeController");
const usersSubscribersController = require("../controllers/userSubscriberController.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { NOTICIAS_KEY, MAILsUB_NODEMAILER, PASS_EMAIL_SUBSCRIBERS } =
  process.env;
const axios = require("axios");

const findSubscriptionHandler = async (req, res) => {
  try {
    const response = await findSubscriptionController(req.user.userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addNewSubscriptionHandler = async (req, res) => {
  const user = req.user;

  try {
    const response = await addNewsSubscriptionsController(user);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

const unsubscribesHandler = async (req, res) => {
  const user = req.user;

  try {
    const response = await unsubscribeController(user);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

const sendNewsSubscribers = async (req, res) => {
  try {
    const usersSubscribers = await usersSubscribersController();
    const lastNews = await axios.get(
      `https://api.currentsapi.services/v1/latest-news?language=en&page_size=3&apiKey=${NOTICIAS_KEY}`
    );
    console.log(lastNews.data.news);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAILsUB_NODEMAILER,
        pass: PASS_EMAIL_SUBSCRIBERS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    usersSubscribers.forEach((user) => {
      const mailOptions = {
        from: MAILsUB_NODEMAILER,
        to: user.email,
        subject: "Rotativo de ultima hora ",
        text: "NewsWave Siempre Informando con la verdad",
        html: ` 
        <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f7f7f7; padding: 20px;">

        <h1 style="color: #333; font-weight: bold;">Hola <span style="color: #0066ff;">usuario</span>,</h1>
        
        <p style="color: #333; font-size: 18px;">A continuación, te presentamos las últimas noticias del día:</p>
        
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <article style="padding: 20px;">
                <h2 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 10px;">${lastNews.data.news[0].title}</h2>
                <img src="${lastNews.data.news[0].image}" alt="${lastNews.data.news[0].title}" style="max-width: 100%; border-radius: 5px; margin-bottom: 10px;">
                <p style="color: #666; font-size: 16px;">${lastNews.data.news[0].description}</p>
                <a href="${lastNews.data.news[0].url}" style="color: #0066ff; text-decoration: none;">Leer más</a>
            </article>
        
            <hr>
        
            <article style="padding: 20px;">
                <h2 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 10px;">${lastNews.data.news[1].title}</h2>
                <img src="${lastNews.data.news[1].image}" alt="${lastNews.data.news[1].title}" style="max-width: 100%; border-radius: 5px; margin-bottom: 10px;">
                <p style="color: #666; font-size: 16px;">${lastNews.data.news[1].description}</p>
                <a href="${lastNews.data.news[1].url}" style="color: #0066ff; text-decoration: none;">Leer más</a>
            </article>
        
            <hr>
        
            <article style="padding: 20px;">
                <h2 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 10px;">${lastNews.data.news[2].title}</h2>
                <img src="${lastNews.data.news[2].image}" alt="${lastNews.data.news[2].title}" style="max-width: 100%; border-radius: 5px; margin-bottom: 10px;">
                <p style="color: #666; font-size: 16px;">${lastNews.data.news[2].description}</p>
                <a href="${lastNews.data.news[2].url}" style="color: #0066ff; text-decoration: none;">Leer más</a>
            </article>
        </div>
        
        <p style="color: #333; font-size: 16px; margin-top: 20px;">Puedes encontrar más noticias <a href="http://localhost:5174/FullNews?categoria=last%20News" style="color: #0066ff; text-decoration: none;">aquí</a>.</p>
        
        <p style="color: #333; font-size: 16px;">¡Gracias por suscribirte a nuestro servicio de noticias!</p>
        
        <p style="color: #333; font-size: 16px; font-weight: bold; margin-top: 20px;">NewsWave - Siempre informando con la verdad</p>
        
        <p style="color: #666; font-size: 16px; margin-top: 20px;">¿Quieres dejar de recibir estos mensajes? <a href="http://localhost:5174?unsubscribe=true" style="color: #0066ff; text-decoration: none;">Haz clic aquí</a>.</p>
        
        </body>
            `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico:", error);
        } else {
          console.log("Correo electrónico enviado:", info.response);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findSubscriptionHandler,
  addNewSubscriptionHandler,
  unsubscribesHandler,
  sendNewsSubscribers,
};
