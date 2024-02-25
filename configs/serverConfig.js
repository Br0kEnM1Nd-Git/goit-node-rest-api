const serverConfig = {
  mongoUri: process.env.DB_URI ?? "",
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? "",
  jwtExpires: process.env.JWT_EXPIRES ?? "1h",
  emailHost: process.env.EMAIL_HOST ?? "",
  emailPort: process.env.EMAIL_PORT ?? 2525,
  emailUser: process.env.EMAIL_USER ?? "",
  emailPass: process.env.EMAIL_PASSWORD ?? "",
};

module.exports = serverConfig;
