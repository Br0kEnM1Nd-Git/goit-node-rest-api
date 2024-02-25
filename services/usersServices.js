const path = require("path");
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { v4 } = require("uuid");
const { usersModel: Users } = require("../models");
const { HttpError } = require("../helpers");
const { jwtServices } = require("../utils");
const {
  usersConstants: { AVATARS_URL },
} = require("../constants");
const EmailServices = require("./emailServices");

async function registerUser(newUserBody) {
  const isUserExists = await Users.exists({ email: newUserBody.email });

  if (isUserExists) throw HttpError(409, "Email in use");

  newUserBody.password = await bcrypt.hash(newUserBody.password, 10);

  newUserBody.avatarURL = gravatar.url(
    newUserBody.email,
    { s: "250", d: "retro" },
    true
  );

  newUserBody.verificationToken = v4();

  await EmailServices.sendEmailVerification(
    newUserBody.email,
    newUserBody.verificationToken
  );

  return Users.create(newUserBody);
}

async function loginUser(loginData) {
  const foundUser = await Users.findOne({
    email: loginData.email,
  });

  if (!foundUser) throw HttpError(401, "Email or password is wrong");

  if (!foundUser.verify) throw HttpError(401, "Email is not verified");

  const { password: passwordHash, email, subscription, id } = foundUser;

  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    passwordHash
  );

  if (!isPasswordValid) throw HttpError(401, "Email or password is wrong");

  const token = jwtServices.signToken(id);

  await Users.findByIdAndUpdate(id, { token });

  return {
    token,
    user: {
      email,
      subscription,
    },
  };
}

async function logoutUser(userId) {
  await Users.findByIdAndUpdate(userId, { token: null });
}

async function changeUserPlan(userId, newPlan) {
  return Users.findByIdAndUpdate(
    userId,
    { subscription: newPlan },
    { new: true }
  );
}

async function changeUserAvatar(file, userId) {
  const filename = file.filename.split(".")[0];

  Jimp.read(path.join(file.destination, file.filename), (err, img) => {
    if (err) throw err;

    img
      .resize(250, 250)
      .write(path.join("public", "avatars", `${filename}.jpg`));
  });

  await fs.unlink(path.join(file.destination, file.filename));

  const { avatarURL } = await Users.findByIdAndUpdate(
    userId,
    {
      avatarURL: `${AVATARS_URL}/${filename}.jpg`,
    },
    { new: true }
  ).select("avatarURL");

  return avatarURL;
}

async function verifyUserEmail(verificationToken) {
  const [foundUser] = await Users.find({ verificationToken });

  if (!foundUser) throw HttpError(404, "User not found");

  await Users.findByIdAndUpdate(foundUser.id, {
    verificationToken: null,
    verify: true,
  });
}

async function resentUserEmailVerification(email) {
  const [{ verificationToken, verify }] = await Users.find({ email });

  if (!verificationToken && !verify) return;

  if (verify) throw HttpError(400, "Verification has already been passed");

  await EmailServices.sendEmailVerification(email, verificationToken);
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  changeUserPlan,
  changeUserAvatar,
  verifyUserEmail,
  resentUserEmailVerification,
};
