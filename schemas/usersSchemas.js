const Joi = require("joi");
const { SUBSCRIPTION_PLANS } = require("../constants/usersConstants");

exports.createUserSchema = Joi.object({
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

// subscription: Joi.string()
//   .empty()
//   .valid(...Object.values(SUBSCRIPTION_PLANS))
//   .messages({
//     "string.base": `Subscription should be a type of 'text'`,
//     "string.empty": `Subscription cannot be an empty field`,
//     "string.valid": `Subscription plan is not aviable`,
//   }),
// token: Joi.string().empty().messages({
//   "string.base": `Subscription should be a type of 'text'`,
//   "string.empty": `Subscription cannot be an empty field`,
// }),

// exports.updateContactSchema = Joi.object({
//   name: Joi.string().empty().min(2).max(16).messages({
//     "string.base": `Name should be a type of 'text'`,
//     "string.empty": `Name cannot be an empty field`,
//     "string.min": `Name should have a minimum length of {#limit}`,
//     "string.max": `Name should have a maximum length of {#limit}`,
//   }),
//   email: Joi.string().empty().email().messages({
//     "string.base": `Email should be a type of 'text'`,
//     "string.empty": `Email cannot be an empty field`,
//     "string.email": "Email is not valid",
//   }),
//   phone: Joi.string().empty().min(10).max(10).messages({
//     "string.base": `Phone should be a type of 'text'`,
//     "string.empty": `Phone cannot be an empty field`,
//     "string.min": `Phone should have a minimum length of {#limit}`,
//     "string.max": `Phone should have a maximum length of {#limit}`,
//   }),
// })
//   .min(1)
//   .messages({ "object.min": `Body must have at least one field` });

// exports.updateStatusContactSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     "boolean.base": `Favorite should be a type of 'boolean'`,
//     "any.required": `Favorite is a required field`,
//   }),
// });
