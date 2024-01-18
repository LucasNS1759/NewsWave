require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,DB_DEPLOY,DB_USER_DEPLOY,DB_PASSWORD_DEPLOY,DB_HOST_DEPLOY } = process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );



//Render
const sequelize = new Sequelize("postgres://mundo_noticia_user:ykczNj6eitxv6tUi9cO9u9hKRmQvJHLK@dpg-cmjbbufqd2ns73fln9a0-a.ohio-postgres.render.com/mundo_noticia", {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Countrie } = sequelize.models;
const { Activity } = sequelize.models;
const { User } = sequelize.models;
const { Review } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Activity.belongsToMany(Countrie, { through: "Activities_Countries" });
Countrie.belongsToMany(Activity, { through: "Activities_Countries" });

User.belongsToMany(Activity, { through: "user_activities" });
Activity.belongsToMany(User, { through: "user_activities" });

User.belongsToMany(Review, { through: "resenas" });
Review.belongsToMany(User, { through: "resenas" });

Activity.belongsToMany(Review, { through: "activities_reviews" });
Review.belongsToMany(Activity, { through: "activities_review" });




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
