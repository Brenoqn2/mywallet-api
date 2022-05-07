import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import validateSchema from "../schemas/validateSchema.js";

export async function validateSignUp(req, res, next) {
  if (!validateSchema(req, signUpSchema)) {
    return res.sendStatus(422);
  }
  next();
}

export async function validateSignIn(req, res, next) {
  if (!validateSchema(req, signInSchema)) {
    return res.sendStatus(422);
  }

  next();
}
