const {Router} = require("express")
const {handlerNoticias, handlerUltimasNoticias,handlerFullNews} = require("../handlers/handlerNoticias.js")

const noticiasRoutes = Router()

noticiasRoutes.get("/?", handlerNoticias)
noticiasRoutes.get("/ultimasNoticias?", handlerUltimasNoticias)
noticiasRoutes.get("/fullNews?", handlerFullNews)








module.exports = noticiasRoutes