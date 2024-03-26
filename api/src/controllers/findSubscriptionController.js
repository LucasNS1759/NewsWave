const { User } = require("../db.js");


const findSubscriptionController = async (id) => {
  const allSubscriptions = await User.findByPk(id,{
    where: {
      subscription: true,
    },
  });
 console.log(allSubscriptions)
  return allSubscriptions.subscription === true? true : false;
};

module.exports = findSubscriptionController;
