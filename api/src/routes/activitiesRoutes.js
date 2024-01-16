const {Router} = require("express")
const {getAllActivitiesHandler,postNewActivitiesHandler} = require("../handlers/handleActivities")

const activitiesRoutes = Router()

activitiesRoutes.get("/?", getAllActivitiesHandler)
activitiesRoutes.post("/", postNewActivitiesHandler)

module.exports = activitiesRoutes