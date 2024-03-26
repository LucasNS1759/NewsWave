const {User} = require("../db.js");

const unsubscribeController = async (user) =>{
    const findUser = await User.findByPk(user.userId);

    findUser.subscription = false;
    // findUser.category_subscription = category;
    await findUser.save();
    console.log(findUser.subscription)
    return findUser.subscription;
}


module.exports = unsubscribeController