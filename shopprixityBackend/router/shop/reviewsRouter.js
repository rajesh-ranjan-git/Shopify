import express from "express";
import fetchProductReviews from "../../controllers/shop/reviews/fetchProductReviews.js";
import addProductReview from "../../controllers/shop/reviews/addProductReview.js";

const reviewsRouter = express.Router();

// Reviews Routes
reviewsRouter.get("/fetchProductReviews/:productId", fetchProductReviews);
reviewsRouter.post("/addProductReview", addProductReview);

export default reviewsRouter;
