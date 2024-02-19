const { Types } = require("mongoose");
const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const validateId = (req, _, next) => {
  const isIdValid = Types.ObjectId.isValid(req.params.id);

  if (!isIdValid) {
    next(HttpError(400, "Not valid ID"));
  }

  next();
};


module.exports = {validateBody, validateId};
