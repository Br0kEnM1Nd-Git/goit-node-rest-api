const { catchAsync } = require("../utils");
const { usersServices: usersService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  const { email, subscription } = await usersService.registerUser(req.body);

  res.status(201).json({ email, subscription });
});

const loginUser = catchAsync(async (req, res) => {
  const authData = await usersService.loginUser(req.body);

  res.status(200).json(authData);
});

module.exports = { createUser, loginUser };
