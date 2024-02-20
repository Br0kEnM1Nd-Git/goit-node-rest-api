const bcrypt = require("bcrypt");
const { usersModel: Users } = require("../models");
const { HttpError } = require("../helpers");
const { jwtServices } = require("../utils");

async function registerUser(newUserBody) {
  const isUserExists = await Users.exists({ email: newUserBody.email });

  if (isUserExists) throw HttpError(409, "Email in use");

  newUserBody.password = await bcrypt.hash(newUserBody.password, 10);

  return Users.create(newUserBody);
}

async function loginUser(loginData) {
  const foundUser = await Users.findOne({
    email: loginData.email,
  });

  if (!foundUser) throw HttpError(401, "Email or password is wrong");

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

module.exports = { registerUser, loginUser };
