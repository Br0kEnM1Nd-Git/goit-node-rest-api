const serverConfig = {
  mongoUri: process.env.DB_URI ?? "",
  port: process.env.PORT ?? 3000,
};

module.exports = serverConfig;
