const {Router } = require("express");
const {getDolaresHanlder} = require("../handlers/handlerDolar")

const dolarRoutes = Router()

dolarRoutes.get("/", getDolaresHanlder)

module.exports = dolarRoutes