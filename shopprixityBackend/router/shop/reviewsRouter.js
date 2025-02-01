import express from "express";
import fetchProductReviews from "../../controllers/shop/reviews/fetchProductReviews.js";
import addProductReview from "../../controllers/shop/reviews/addProductReview.js";

const reviewsRouter = express.Router();

// Reviews Routes
reviewsRouter.get("/fetchReview/:productId", fetchProductReviews);
reviewsRouter.post("/addReview", addProductReview);

export default reviewsRouter;
