const { catchAsync, jwtServices } = require("../utils");
const { usersModel: Users } = require("../models");
const { HttpError } = require("../helpers");

const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  const userId = jwtServices.checkToken(token);

  if (!userId) throw HttpError(401, "Not authorized");

  const currentUser = await Users.findById(userId);

  if (!currentUser || currentUser.token !== token)
    throw HttpError(401, "Not authorized");

  req.user = currentUser;

  next();
});

module.exports = { protect };
