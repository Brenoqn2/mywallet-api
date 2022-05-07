import { Router } from "express";
import {
  getTransactions,
  postTransaction,
} from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/transactions", getTransactions);
userRouter.post("/transactions", postTransaction);

export default userRouter;
