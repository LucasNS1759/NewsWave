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
      `https://api.currentsapi.services/v1/latest-news?language=en&page_size=3&apiKey=LP-6uylJws-Cof6XIyS2fyUO5fai0qNxIhCmJitBdwG_00HO`
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
        <body
         justify-content: center ;align-items: center; text-align: center;  height: 100vh;">
        <h1 style="color: rgb(0, 0, 0);font-weight: 900; font-family:cursive;filter:drop-shadow(0 0 25px rgb(5, 5, 5)) ;">
                Hola ${"usuario"},</h1>
            <h2 style=" width: 600px;  font-family: cursive; font-weight: 600;">A continuación, te presentamos las últimas
                <br> noticias del día:
            </h2>
            
        <article >
            <hr>
           
            <h3 style="   color: rgb(7, 7, 7);
            font-size: 2rem;
            filter: drop-shadow(0 0 10px black)">${
              lastNews.data.news[0].title
            }</h3>
            <img style="border-radius: 2rem; width: 200px; filter: drop-shadow(0 0 10px black)"
                src=${lastNews.data.news[0].image}
                alt="">
            <p style="  color: rgb(8, 8, 8);
            font-weight: 900;
            font-size: 18px;
            font-family: cursive;
            margin: auto auto;
           padding: 1rem;
            text-shadow: black;
            text-align: center;
            width: 600px;
            filter: drop-shadow(0 0 25px rgb(0, 0, 0))">
            
            ${lastNews.data.news[0].description}
                </p>
            <a style="color: blue;  font-size: 18px; " onmouseover="this.style.color='red'"
                onmouseout="this.style.color='blue'" href=${
                  lastNews.data.news[0].url
                }>full News</a>
            <br>
            <hr>
        </article>
        
        <article >
       
       
        <h3 style="   color: rgb(7, 7, 7);
        font-size: 2rem;
        filter: drop-shadow(0 0 10px black)">${lastNews.data.news[1].title}</h3>
        <img style="border-radius: 2rem; width: 200px; filter: drop-shadow(0 0 10px black)"
            src=${lastNews.data.news[1].image}
            alt="">
        <p style="  color: rgb(8, 8, 8);
        font-weight: 900;
        font-size: 18px;
        font-family: cursive;
        margin: auto auto;
       padding: 1rem;
        text-shadow: black;
        text-align: center;
        width: 600px;
        filter: drop-shadow(0 0 25px rgb(0, 0, 0))">
        
        ${lastNews.data.news[1].description}
            </p>
        <a style="color: blue;  font-size: 18px; " onmouseover="this.style.color='red'"
            onmouseout="this.style.color='blue'" href=${
              lastNews.data.news[1].url
            }>full News</a>
        <br>
        <hr>
    </article>
    
    <article >
    
   
    <h3 style="   color: rgb(7, 7, 7);
    font-size: 2rem;
    filter: drop-shadow(0 0 10px black)">${lastNews.data.news[2].title}</h3>
    <img style="border-radius: 2rem; width: 200px; filter: drop-shadow(0 0 10px black)"
        src=${lastNews.data.news[2].image}
        alt="">
    <p style="  color: rgb(8, 8, 8);
    font-weight: 900;
    font-size: 18px;
    font-family: cursive;
    margin: auto auto;
   padding: 1rem;
    text-shadow: black;
    text-align: center;
    width: 600px;
    filter: drop-shadow(0 0 25px rgb(0, 0, 0))">
    
    ${lastNews.data.news[2].description}
        </p>
    <a style="color: blue;  font-size: 18px; " onmouseover="this.style.color='red'"
        onmouseout="this.style.color='blue'" href=${
          lastNews.data.news[2].url
        }>full News</a>
    <br>
    <hr>
</article>
        
            <p style="  color: rgb(8, 8, 8);
            font-weight: 900;
            font-size: 15px;
            font-family: cursive;
            margin: auto auto;
          
            text-shadow: black;
            text-align: center;
            width: 200px;
            filter: drop-shadow(0 0 25px rgb(0, 0, 0))">Puedes encontrar mas noticias <a
                    href="http://localhost:5174/FullNews?categoria=last%20News">aquí</a>.</p>
            <p style="  color: rgb(8, 8, 8);
            font-weight: 900;
            font-size: 15px;
            font-family: cursive;
            margin: auto auto;
           padding: 1rem;
            text-shadow: black;
            text-align: center;
            width: 200px;
            filter: drop-shadow(0 0 25px rgb(0, 0, 0))">¡Gracias por suscribirte a nuestro servicio de noticias!</p>
    
            <p style="  color: rgb(8, 8, 8);
            font-weight: 700;
            font-size: 15px;
            font-family: cursive;
            margin: auto auto;
           padding: 1rem;
            text-shadow: black;
            text-align: center;
            width: 200px;
            filter: drop-shadow(0 0 25px rgb(0, 0, 0))"><span style="font-size: 18px; font-weight: bolder;">NewsWave</span>
                <br> Siempre informando con la verdad
            </p>
            <br />
            <span style="  color: rgb(8, 8, 8);
            font-weight: 900;
            font-size: 15px;
            font-family: cursive;
            margin: auto auto;
         
            text-shadow: black;
            text-align: center;
         
            filter: drop-shadow(0 0 25px rgb(0, 0, 0))">Quieres dejar de recibir estos mensajes?</span> <br>
            <a style="margin: 1rem 1rem;" href="https://nodemailer.com/message/custom-source/">click aca</a>
        
    
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
