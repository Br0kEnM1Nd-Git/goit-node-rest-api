const Joi = require("joi");

exports.createContactSchema = Joi.object({
  name: Joi.string().empty().min(2).max(16).required().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty field`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "string.max": `Name should have a maximum length of {#limit}`,
    "any.required": `Name is a required field`,
  }),
  email: Joi.string().empty().email().required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.email": "Email is not valid",
    "any.required": `Email is a required field`,
  }),
  phone: Joi.string().empty().min(7).max(12).required().messages({
    "string.base": `Phone should be a type of 'text'`,
    "string.empty": `Phone cannot be an empty field`,
    "string.min": `Phone should have a minimum length of {#limit}`,
    "string.max": `Phone should have a maximum length of {#limit}`,
    "any.required": `Phone is a required field`,
  }),
});

exports.updateContactSchema = Joi.object({
  name: Joi.string().empty().min(2).max(16).messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty field`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "string.max": `Name should have a maximum length of {#limit}`,
  }),
  email: Joi.string().empty().email().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.email": "Email is not valid",
  }),
  phone: Joi.string().empty().min(7).max(12).messages({
    "string.base": `Phone should be a type of 'text'`,
    "string.empty": `Phone cannot be an empty field`,
    "string.min": `Phone should have a minimum length of {#limit}`,
    "string.max": `Phone should have a maximum length of {#limit}`,
  }),
})
  .min(1)
  .messages({ "object.min": `Body must have at least one field` });
