const { Router } = require('express');
const countryRoutes = require("../routes/countryRoutes")
const activitiesRoutes = require("../routes/activitiesRoutes")
const noticiasRoutes = require("../routes/noticiasRoutes");
const usuarioRoutes = require('./usuarioRoutes');
const dolarRoutes = require("./dolarRoutes")
const climaRoutes = require("./climaRoutes");
const reviewsRoutes = require("./reviewsRoutes");
const subscriptionRoutes = require('./subscriptionRoutes');
const { verifyToken } = require("../middleWare/authMiddleWare");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use("/countries",countryRoutes)
router.use("/activities",activitiesRoutes)
router.use("/noticias", noticiasRoutes)
router.use("/usuario", usuarioRoutes)
router.use("/dolar",dolarRoutes)
router.use("/clima",climaRoutes)
router.use("/review", reviewsRoutes)
router.use("/subscription", verifyToken, subscriptionRoutes)





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
