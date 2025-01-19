import { Router } from "express";
import authMiddleware from "../../middlewares/auth/authMiddleware.js";
import checkAuth from "../../controllers/auth/checkAuth.js";
import register from "../../controllers/auth/register.js";
import login from "../../controllers/auth/login.js";
import logout from "../../controllers/auth/logout.js";

const authRouter = Router();

authRouter.get("/checkAuth", authMiddleware, checkAuth);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
