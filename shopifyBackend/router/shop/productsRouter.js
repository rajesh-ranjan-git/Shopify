import express from "express";
import fetchAllShopProducts from "../../controllers/shop/productsController.js";

const shopProductsRouter = express.Router();

shopProductsRouter.get("/fetchAllShopProducts", fetchAllShopProducts);

export default shopProductsRouter;
