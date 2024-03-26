const { User } = require("../db.js");

const addNewsSubscriptionsController = async (user) => {
  const findUser = await User.findByPk(user.userId);

  findUser.subscription = true;
  // findUser.category_subscription = category;
  await findUser.save();
  
  return findUser;
};

module.exports = addNewsSubscriptionsController;
