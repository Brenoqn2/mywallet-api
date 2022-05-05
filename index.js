import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { signUp, signIn } from "./controllers/authController.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", signUp);

app.post("/signin", signIn);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
