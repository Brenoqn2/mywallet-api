import joi from "joi";

export const transactionSchema = joi.object({
  description: joi.string().required(),
  date: joi
    .string()
    .pattern(new RegExp("^([0-2][0-9]|(3)[0-1])/((0)[0-9]|(1)[0-2])"))
    .required(),
  amount: joi.string().pattern(new RegExp("^[0-9]*,[0-9]{2}$")).required(),
  isIncome: joi.boolean().required(),
});
