import express from "express";
import fetchAllShopProducts from "../../controllers/shop/productsController.js";
import fetchShopProductDetails from "../../controllers/shop/fetchShopProductDetails.js";

const shopProductsRouter = express.Router();

shopProductsRouter.get("/fetchAllShopProducts", fetchAllShopProducts);
shopProductsRouter.get("/fetchShopProductDetails", fetchShopProductDetails);

export default shopProductsRouter;
