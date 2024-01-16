const { Router } = require("express");
const { getClimaHandler,getClimaExtendido,getCoordenadas } = require("../handlers/handlerClima");
const climaRoutes = Router();


climaRoutes.get("/?", getClimaHandler);
climaRoutes.get("/extendido?",getClimaExtendido)
climaRoutes.get("/localizacion?",getCoordenadas)



module.exports = climaRoutes;
