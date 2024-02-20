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

const logoutUser = catchAsync(async (req, res) => {
  await usersService.logoutUser(req.user.id);

  res.sendStatus(204);
});

const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const changeUserPlan = catchAsync(async (req, res) => {
  const { email, subscription } = await usersService.changeUserPlan(
    req.user.id,
    req.body.plan
  );

  res.status(200).json({ email, subscription });
});

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserPlan,
};
