import { Router } from "express";
import {
  getTransactions,
  postTransaction,
} from "../controllers/userController.js";
import { validateTransaction } from "../middlewares/userMiddlewares.js";

const userRouter = Router();
userRouter.get("/transactions", getTransactions);
userRouter.post("/transactions", validateTransaction, postTransaction);

export default userRouter;
