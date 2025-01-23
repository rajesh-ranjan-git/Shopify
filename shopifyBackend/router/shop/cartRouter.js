import express from "express";
import addOrUpdateCart from "../../controllers/shop/cart/addOrUpdateCart.js";

const cartRouter = express.Router();

cartRouter.put("/addOrUpdateCart", addOrUpdateCart);

export default cartRouter;
