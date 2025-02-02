import { Router } from "express";
import authMiddleware from "../../middlewares/auth/authMiddleware.js";
import checkAuth from "../../controllers/auth/checkAuth.js";
import register from "../../controllers/auth/register.js";
import login from "../../controllers/auth/login.js";
import logout from "../../controllers/auth/logout.js";
import googleAuthFirebase from "../../controllers/auth/googleAuthFirebase.js";

const authRouter = Router();

// Auth router
authRouter.get("/checkAuth", authMiddleware, checkAuth);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/googleAuthFirebase", googleAuthFirebase);

export default authRouter;
