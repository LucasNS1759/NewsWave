const {User} = require("../db.js")


const usersSubscribersController = async () =>{
    const usersWithSubscription = await User.findAll({
        where: {
          subscription: true
        }
      });
      return usersWithSubscription
}

module.exports = usersSubscribersController