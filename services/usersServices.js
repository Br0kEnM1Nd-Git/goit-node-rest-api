const { usersModel: Users } = require("../models");

async function registerUser(newUserBody) {
  return Users.create(newUserBody);
}

module.exports = { registerUser };
