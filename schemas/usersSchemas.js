const Joi = require("joi");
const { SUBSCRIPTION_PLANS } = require("../constants/usersConstants");

exports.authUserSchema = Joi.object({
  password: Joi.string().empty().min(4).max(24).required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minimum length of {#limit}`,
    "string.max": `Password should have a maximum length of {#limit}`,
    "any.required": `Password is a required field`,
  }),
  email: Joi.string().empty().email().required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.email": "Email is not valid",
    "any.required": `Email is a required field`,
  }),
});

exports.changePlanUserSchema = Joi.object({
  plan: Joi.string()
    .empty()
    .valid(...Object.values(SUBSCRIPTION_PLANS))
    .required()
    .messages({
      "string.base": `Plan should be a type of 'text'`,
      "string.empty": `Plan cannot be an empty field`,
      "any.only": `Plan is not avaiable`,
      "any.required": `Plan is a required field`,
    }),
});
