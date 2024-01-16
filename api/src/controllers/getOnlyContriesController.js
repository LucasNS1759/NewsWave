const { Countrie } = require("../db.js");


const getOnlyContriesController = async () =>{
 const countries = await Countrie.findAll({
    order: [['nombreComun', 'ASC']]
 });
 
 const response = countries.map((pais)=>{
 return {
  id: pais.id,
  pais: pais.nombreComun
 }
  
 })
 return response
}

module.exports= getOnlyContriesController