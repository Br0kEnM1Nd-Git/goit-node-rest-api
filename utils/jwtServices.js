const jwt = require("jsonwebtoken");
const { serverConfig } = require("../configs");
const { HttpError } = require("../helpers");

const signToken = (id) =>
  jwt.sign({ id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpires,
  });

const checkToken = (token) => {
  if (!token) throw HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);

    return id;
  } catch (err) {
    throw HttpError(401, "Not authorized");
  }
};

module.exports = { checkToken, signToken };
