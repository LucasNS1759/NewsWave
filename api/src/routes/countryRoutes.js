const {Router} = require("express")
const {getCountriesHandler,saveCountriesHandlers, getDetailHandler,getOnlyCountriesHandler} = require("../handlers/handlersCountry")
const authMiddleWare = require("../middleWare/authMiddleWare")

const countryRoutes = Router()

countryRoutes.get("/",getCountriesHandler)
countryRoutes.get("/onlyCountries",authMiddleWare,getOnlyCountriesHandler)

countryRoutes.get("/saveDataApi",saveCountriesHandlers)
countryRoutes.get("/:id" ,getDetailHandler )
module.exports = countryRoutes