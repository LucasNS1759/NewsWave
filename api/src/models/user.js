const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "The password is required",
          },
        },
      },
      subscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      category_subscription: {
        type: DataTypes.ENUM([
          "regional",
          "technology",
          "lifestyle",
          "business",
          "general",
          "programming",
          "science",
          "entertainment",
          "world",
          "sports",
          "finance",
          "academia",
          "politics",
          "health",
          "opinion",
          "food",
          "game",
          "last News"
        ]),
        allowNull: true,
      },
    },

    {
      hooks: {
        beforeCreate: async (User) => {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(User.password, salt);
          User.password = hash;
        },
      },
      timesTamps: false,
    }
  );

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
