import {
  signUpSchema,
  signInSchema,
  validateSchema,
} from "../schemas/authSchemas.js";

export async function validateSignUp(req, res, next) {
  if (!validateSchema(req.body, signUpSchema)) {
    return res.sendStatus(422);
  }
  next();
}

export async function validateSignIn(req, res, next) {
  if (!validateSchema(req.body, signInSchema)) {
    return res.sendStatus(422);
  }

  next();
}
