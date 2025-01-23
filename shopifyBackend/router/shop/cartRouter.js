import express from "express";
import fetchCartItems from "../../controllers/shop/cart/fetchCartItems.js";
import addCartItems from "../../controllers/shop/cart/addCartItems.js";
import updateCartItems from "../../controllers/shop/cart/updateCartItems.js";
import deleteCartItems from "../../controllers/shop/cart/deleteCartItems.js";

const cartRouter = express.Router();

cartRouter.get("/fetchCartItems/:userId", fetchCartItems);
cartRouter.post("/addCartItems", addCartItems);
cartRouter.put("/updateCartItems", updateCartItems);
cartRouter.delete("/deleteCartItems", deleteCartItems);

export default cartRouter;
