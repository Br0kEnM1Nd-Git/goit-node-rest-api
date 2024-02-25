const nodemailer = require("nodemailer");
const { serverConfig } = require("../configs");

class EmailServices {
  static #config = {
    host: serverConfig.emailHost,
    port: serverConfig.emailPort,
    auth: {
      user: serverConfig.emailUser,
      pass: serverConfig.emailPass,
    },
  };

  static #transporter = nodemailer.createTransport(this.#config);

  static sendEmailVerification = async (userEmail, verificationToken) => {
    const emailOptions = {
      from: "apitestservice@meta.ua",
      to: userEmail,
      subject: "Email verification",
      text: `Привіт. Ось твоє посилання для верифікації емейлу:\nhttp://localhost:${serverConfig.port}/users/verify/${verificationToken}`,
    };

    return this.#transporter.sendMail(emailOptions);
  };
}

module.exports = EmailServices;
