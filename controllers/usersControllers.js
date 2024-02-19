const { catchAsync } = require("../utils");
const { usersServices: usersService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  const { email, subscription } = await usersService.registerUser(req.body);

  res.status(201).json({ email, subscription });
});

module.exports = { createUser };
