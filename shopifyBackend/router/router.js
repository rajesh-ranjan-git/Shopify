import { Router } from "express";
import authRouter from "./auth/authRouter.js";
import adminProductsRouter from "./admin/productsRouter.js";
import shopProductsRouter from "./shop/productsRouter.js";
import cartRouter from "./shop/cartRouter.js";

const router = Router();

// Auth routes
router.use("/auth", authRouter);

// Admin Product routes
router.use("/admin/products", adminProductsRouter);

// Shop Product routes
router.use("/shop/products", shopProductsRouter);

export default router;
