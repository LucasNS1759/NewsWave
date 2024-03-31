const { User } = require("../db.js");

const unsubscribeController = async (user) => {
  const findUser = await User.findByPk(user.userId);
  findUser.subscription = false;
  await findUser.save();
  return {
    title: "You unsubscribed successfully",
    text: "you can subscribe again at any time",
  };
};

module.exports = unsubscribeController;
