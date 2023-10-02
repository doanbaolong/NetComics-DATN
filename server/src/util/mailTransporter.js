const nodemailer = require("nodemailer");

const mailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  return transporter;
};

module.exports = { mailTransporter };
