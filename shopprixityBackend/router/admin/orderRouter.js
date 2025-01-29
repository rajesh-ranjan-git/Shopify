import express from "express";
import fetchAllOrders from "../../controllers/admin/order/fetchAllOrders.js";
import fetchOrderDetails from "../../controllers/admin/order/fetchOrderDetails.js";
import updateOrderStatus from "../../controllers/admin/order/updateOrderStatus.js";

const adminOrderRouter = express.Router();

// Admin Order routes
adminOrderRouter.get("/allOrders", fetchAllOrders);
adminOrderRouter.get("/orderDetails/:orderId", fetchOrderDetails);
adminOrderRouter.put("/updateOrderStatus/:orderId", updateOrderStatus);

export default adminOrderRouter;
