const { Router } = require("express");
const {
  addNewSubscriptionHandler,
  unsubscribesHandler,
  findSubscriptionHandler,
} = require("../handlers/handlerSubscription");


const subscriptionRoutes = Router();

subscriptionRoutes.get("/", findSubscriptionHandler);
subscriptionRoutes.put("/" ,addNewSubscriptionHandler);
subscriptionRoutes.delete("/", unsubscribesHandler);

module.exports = subscriptionRoutes;
