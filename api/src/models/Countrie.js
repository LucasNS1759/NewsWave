const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "countrie",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        isUnique: true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4,
      },
      nombreComun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombreOficial: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      bandera: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
   
      subRegion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paisesFronterizos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      gini: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      zonaHoraria: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      googleMaps: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitud : {
       type : DataTypes.ARRAY(DataTypes.FLOAT),
       allowNull: false,
      },
      idioma: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      area: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      poblacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      moneda:{
      type:DataTypes.JSONB,
      
      },
      soberano:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      }
    },
    { timeStamps: false }
  );
};
