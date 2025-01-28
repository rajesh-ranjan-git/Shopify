import express from "express";
import fetchShopProducts from "../../controllers/shop/product/fetchShopProducts.js";
import fetchShopProductDetails from "../../controllers/shop/product/fetchShopProductDetails.js";
import searchShopProducts from "../../controllers/shop/product/searchShopProducts.js";

const shopProductsRouter = express.Router();

shopProductsRouter.get("/fetchShopProducts", fetchShopProducts);
shopProductsRouter.get("/fetchShopProductDetails/:id", fetchShopProductDetails);
shopProductsRouter.get(
  "/searchShopProducts/:searchKeyword",
  searchShopProducts
);

export default shopProductsRouter;
