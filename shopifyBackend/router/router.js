import { Router } from "express";
import authRouter from "./auth/authRouter.js";
import adminProductsRouter from "./admin/productsRouter.js";
import shopProductsRouter from "./shop/productsRouter.js";
import cartRouter from "./shop/cartRouter.js";
import addressRouter from "./shop/addressRouter.js";

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

export default router;
