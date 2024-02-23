const serverConfig = {
  mongoUri: process.env.DB_URI ?? "",
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? "",
  jwtExpires: process.env.JWT_EXPIRES ?? "1h",
};

module.exports = serverConfig;
