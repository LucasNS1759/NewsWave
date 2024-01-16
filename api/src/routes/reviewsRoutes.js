const { Router } = require("express");
const {getAllReviewsHandler,postReviewsHandler} = require("../handlers/handlerReviews")

const reviewsRoutes = Router();

 reviewsRoutes.get("/",getAllReviewsHandler);
 reviewsRoutes.post("/",postReviewsHandler);
 

module.exports = reviewsRoutes;
