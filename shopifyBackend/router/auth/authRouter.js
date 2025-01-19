import { Router } from "express";
import {
  authMiddleware,
  login,
  logout,
  register,
} from "../../controllers/auth/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/checkAuth", authMiddleware, (req, res) => {
  const user = req.user;
  console.log("user : ", user);

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Authorized user!",
    user: user,
  });
});

export default authRouter;
