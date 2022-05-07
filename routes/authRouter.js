import { Router } from "express";
import { signUp, signIn, logOut } from "../controllers/authController.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middlewares/authMiddlewares.js";

const authRouter = Router();
authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", validateSignIn, signIn);
authRouter.delete("/log-out", logOut);

export default authRouter;
