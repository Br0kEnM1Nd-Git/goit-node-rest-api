const Joi = require("joi");

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
