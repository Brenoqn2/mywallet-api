import joi from "joi";

export const signUpSchema = joi.object({
  user: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  repeatPassword: joi.string().required().valid(joi.ref("password")),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
