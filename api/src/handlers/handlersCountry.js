const saveCountriesController = require("../controllers/saveCountriesController.js")
const getAllCountriesController = require("../controllers/getAllCountriesController.js")
const getDetailCountrieController = require("../controllers/getDetailCountrieController.js")
const getOnlyContriesController = require("../controllers/getOnlyContriesController.js")


const getCountriesHandler = async(req,res) =>{

try {
   const response = await getAllCountriesController(req.query)
   res.status(200).json(response)
} catch (error) {
   res.status(400).json(error.message)
}
}

const saveCountriesHandlers = async(req,res) =>{
 try {
    const countries = await saveCountriesController()
    res.status(200).json(countries)
 } catch (error) {
    res.status(400).json({error:error.message})
 }
}

const getDetailHandler = async  (req, res) =>{
  const { id } = req.params
  console.log(id)
 try {
   const response = await getDetailCountrieController(id)
   res.status(200).json(response )
   
 } catch (error) {
   res.status(400).json({error: error.message})
 }
}

const getOnlyCountriesHandler = async (req,res) =>{
 try {
   const response = await getOnlyContriesController()
   res.status(200).json(response )
 } catch (error) {
   res.status(400).json({error: error.message})
   
 }
}

module.exports={getCountriesHandler,saveCountriesHandlers,getDetailHandler,getOnlyCountriesHandler}