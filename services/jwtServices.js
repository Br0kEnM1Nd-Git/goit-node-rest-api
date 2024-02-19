const jwt = require("jsonwebtoken");
const { serverConfig } = require("../configs");
const { HttpError } = require("../helpers");

const signToken = (id) =>
  jwt.sign({ id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpires,
  });

const checkToken = (token) => {
  if (!token) throw new HttpError(401, "Not logged in..");

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);

    return id;
  } catch (err) {
    throw new HttpError(401, "Not logged in..");
  }
};

module.exports = { checkToken, signToken };
