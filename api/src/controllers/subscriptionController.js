const { User } = require("../db.js");

const addNewsSubscriptionsController = async (user) => {
  const findUser = await User.findByPk(user.userId);

  findUser.subscription = true;
  // findUser.category_subscription = category;
  await findUser.save();

  return {
    title: "you have successfully subscribed to the news service",
    text: "Now you will receive the latest, most up-to-date news in your email",
  };
};

module.exports = addNewsSubscriptionsController;
