const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reset_tokens_black_list",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
       tokenExpired :{
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
       }
    },
    { timeStamps: false }
  );
};
