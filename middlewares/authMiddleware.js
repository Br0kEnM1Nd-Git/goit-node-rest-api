const { catchAsync } = require("../utils");

const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  const userId = jwtService.checkToken(token);

  if (!userId) throw new HttpError(401, "Not logged in..");

  const currentUser = await userService.getUserById(userId);

  if (!currentUser) throw new HttpError(401, "Not logged in..");

  req.user = currentUser;

  next();
});
