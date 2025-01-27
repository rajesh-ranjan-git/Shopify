import express from "express";
import createOrder from "../../controllers/shop/order/createOrder.js";
import capturePayment from "../../controllers/shop/order/capturePayment.js";

const orderRouter = express.Router();

orderRouter.post("/createOrder", createOrder);
orderRouter.post("/capturePayment", capturePayment);

export default orderRouter;
