import { Router } from "express";
import { register } from "../../controllers/auth/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
// authRouter.post("/login", login);

export default authRouter;
