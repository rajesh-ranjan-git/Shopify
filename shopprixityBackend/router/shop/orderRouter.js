import express from "express";
import createOrder from "../../controllers/shop/order/createOrder.js";
import capturePayment from "../../controllers/shop/order/capturePayment.js";
import fetchOrderDetails from "../../controllers/shop/order/fetchOrderDetails.js";
import fetchAllOrdersByUser from "../../controllers/shop/order/fetchAllOrdersByUser.js";

const orderRouter = express.Router();

orderRouter.post("/createOrder", createOrder);
orderRouter.post("/capturePayment", capturePayment);
orderRouter.get("/allOrders/:userId", fetchAllOrdersByUser);
orderRouter.get("/orderDetails/:orderId", fetchOrderDetails);

export default orderRouter;
