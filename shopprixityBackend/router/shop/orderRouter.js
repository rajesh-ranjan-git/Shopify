import express from "express";
import createOrder from "../../controllers/shop/order/createOrder.js";

const orderRouter = express.Router();

orderRouter.post("/createOrder", createOrder);

export default orderRouter;
