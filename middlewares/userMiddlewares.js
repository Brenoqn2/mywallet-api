import { transactionSchema } from "../schemas/userSchemas.js";
import validateSchema from "../schemas/validateSchema.js";

export async function validateTransaction(req, res, next) {
  if (!validateSchema(req, transactionSchema)) {
    return res.sendStatus(422);
  }
  next();
}
