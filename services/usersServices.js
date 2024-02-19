const { usersModel: Users } = require("../models");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");

async function registerUser(newUserBody) {
  const isUserExists = await Users.exists({ email: newUserBody.email });

  if (isUserExists) throw HttpError(409, "Email in use");

  newUserBody.password = await bcrypt.hash(newUserBody.password, 10);

  return Users.create(newUserBody);
}

module.exports = { registerUser };
