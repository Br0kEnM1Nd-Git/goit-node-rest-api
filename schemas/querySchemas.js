const Joi = require("joi");

exports.contactsQuerySchema = Joi.object({
  limit: Joi.string().empty().regex(new RegExp("^[0-9]")).messages({
    "string.base": `Limit should be a type of 'text'`,
    "string.empty": `Limit cannot be an empty field`,
    "string.regex": "Limit must be a number",
  }),
  page: Joi.string().empty().regex(new RegExp("^[0-9]")).messages({
    "string.base": `Page should be a type of 'text'`,
    "string.empty": `Page cannot be an empty field`,
    "string.regex": "Page must be a number",
  }),
  favorite: Joi.boolean().messages({
    "boolean.base": `Favorite should be a type of 'boolean'`,
  }),
});
