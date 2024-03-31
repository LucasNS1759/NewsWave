const express = require("express");
const cors = require("cors");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const routes = require("./routes/index.js");
const session = require("express-session");
const passport = require("passport");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cron = require("node-cron");
const { sendNewsSubscribers } = require("./handlers/handlerSubscription.js");


server.use(
  cors({
    origin: "http://localhost:5174", // Asegúrate de que coincida con el origen de tu aplicación
    credentials: true, // Habilita el envío de cookies con credenciales si es necesario
  })
);
server.use(
  "/usuario",
  cors({
    origin: "http://localhost:5174", // Asegúrate de que coincida con el origen de tu aplicación
    credentials: true, // Habilita el envío de cookies con credenciales si es necesario
  })
);

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(helmet());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(
  session({
    secret: process.env.SECRET_CLIENT,
    resave: false,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());
// Cron job para ejecutar sendNewsEmails cada día a las 8 a.m.
cron.schedule("08 18 * * *", () => {
  console.log("Consultando nuevas noticias y enviando correos electrónicos...");
  sendNewsSubscribers();
});

const task = () => {
  console.log("Consultando nuevas noticias y enviando correos electrónicos...");
  sendNewsSubscribers();
};

// Define la hora de inicio para la primera tarea cron
let hour = 0;
let minute = 16;

// Crea 24 tareas cron, una para cada hora en punto
for (let i = 0; i < 24; i++) {
  // Crea la expresión cron para ejecutar la tarea en cada hora en punto
  const cronExpression = `${minute} ${hour} * * *`;

  // Programa la tarea cron
  cron.schedule(cronExpression, task);

  // Incrementa la hora para la siguiente tarea cron
  hour++;

  // Reinicia la hora a 0 si alcanza 24 para representar un nuevo día
  if (hour === 24) {
    hour = 0;
  }
}
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
