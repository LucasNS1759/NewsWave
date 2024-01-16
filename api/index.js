const server = require('./src/app.js');
const { conn } = require('./src/db.js');


const saveCountriesController = require("./src/controllers/saveCountriesController.js")

// Syncing all the models at once.


conn.sync({ alter: true }).then(async () => {
await saveCountriesController()
console.log("estoy conectado a ",conn.getDatabaseName());
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
