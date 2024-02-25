const { catchAsync } = require("../utils");
const { usersServices: usersService } = require("../services");
const { HttpError } = require("../helpers");

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

const changeUserAvatar = catchAsync(async (req, res) => {
  if (!req.file) throw HttpError(400, "No image recieved");

  const avatarURL = await usersService.changeUserAvatar(req.file, req.user.id);

  res.status(200).json({ avatarURL });
});

const verifyUserEmail = catchAsync(async (req, res) => {
  await usersService.verifyUserEmail(req.params.verificationToken);

  res.status(200).json({ message: "Verification successful" });
});

const resentUserEmailVerification = catchAsync(async (req, res) => {
  await usersService.resentUserEmailVerification(req.body.email);

  res.status(200).json({ message: "Verification email sent" });
});

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserPlan,
  changeUserAvatar,
  verifyUserEmail,
  resentUserEmailVerification,
};
