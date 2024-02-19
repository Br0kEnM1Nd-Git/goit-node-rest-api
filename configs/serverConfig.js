const serverConfig = {
  mongoUri: process.env.DB_URI ?? "",
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? "",
};

module.exports = serverConfig;
