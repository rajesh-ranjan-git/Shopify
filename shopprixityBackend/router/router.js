import { Router } from "express";
import authRouter from "./auth/authRouter.js";
import adminProductsRouter from "./admin/productsRouter.js";
import shopProductsRouter from "./shop/productsRouter.js";
import cartRouter from "./shop/cartRouter.js";
import addressRouter from "./shop/addressRouter.js";
import orderRouter from "./shop/orderRouter.js";
import adminOrderRouter from "./admin/orderRouter.js";

// Router instance
const router = Router();

// Auth routes
router.use("/auth", authRouter);

// Admin Product routes
router.use("/admin/products", adminProductsRouter);

// Shop Product routes
router.use("/shop/products", shopProductsRouter);

// Cart routes
router.use("/shop/cart", cartRouter);

// Address routes
router.use("/shop/address", addressRouter);

// Order routes
router.use("/shop/order", orderRouter);

// Admin Order routes
router.use("/admin/order", adminOrderRouter);

export default router;
