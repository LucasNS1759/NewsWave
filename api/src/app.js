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


server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de que coincida con el origen de tu aplicación
    credentials: true, // Habilita el envío de cookies con credenciales si es necesario
  })
); 
server.use("/usuario",
  cors({
    origin: "http://localhost:5173", // Asegúrate de que coincida con el origen de tu aplicación
    credentials: true, // Habilita el envío de cookies con credenciales si es necesario
  })
); 



server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(helmet());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});



// server.use(
//   "http://localhost:3001", // Define una ruta local a la que se dirigirán las solicitudes de proxy
//   createProxyMiddleware({
//     target: "http://localhost:3001/usuario/auth/google", // La URL de destino, en este caso, la URL de autenticación de Google
//     changeOrigin: true, // Cambiar el encabezado 'Host' a la URL de destino
//     pathRewrite: {
//       "^/proxy": "", // Elimina el prefijo '/proxy' en la URL de destino
//     },
//     // Otras opciones de configuración, si es necesario
//   })
// );

server.use(
  session({
    secret: process.env.SECRET_CLIENT,
    resave: false,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());



server.use("/",  routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
