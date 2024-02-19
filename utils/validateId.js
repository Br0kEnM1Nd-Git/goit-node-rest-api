const { Types } = require("mongoose");

const validateId = (req, _, next) => {
  const isIdValid = Types.ObjectId.isValid(req.params.id);

  if (!isIdValid) {
    next(HttpError(400, "Not valid ID"));
  }

  next();
};

module.exports = validateId;
