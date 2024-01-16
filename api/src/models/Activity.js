const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        isUnique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },

      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        isUnique: true
      },
      Dificultad: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
      Duracion: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      Temporada: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
      },
    },
    { timeStamps: false }
  );
};
