const { serverConfig } = require("../configs");

const SUBSCRIPTION_PLANS = ["starter", "pro", "business"];

const AVATARS_URL = `http://localhost:${serverConfig.port}/avatars`;

module.exports = { SUBSCRIPTION_PLANS, AVATARS_URL };
