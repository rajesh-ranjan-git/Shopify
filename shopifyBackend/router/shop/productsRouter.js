import express from "express";
import fetchShopProducts from "../../controllers/shop/product/fetchShopProducts.js";
import fetchShopProductDetails from "../../controllers/shop/product/fetchShopProductDetails.js";

const shopProductsRouter = express.Router();

shopProductsRouter.get("/fetchShopProducts", fetchShopProducts);
shopProductsRouter.get("/fetchShopProductDetails/:id", fetchShopProductDetails);

export default shopProductsRouter;
