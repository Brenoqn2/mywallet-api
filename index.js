import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { removeSessions } from "./controllers/authController.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(userRouter);

setInterval(removeSessions, 60000);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
