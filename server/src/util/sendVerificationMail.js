const { mailTransporter } = require("./mailTransporter");

const sendVerificationMail = async (user) => {
  try {
    const transporter = mailTransporter();

    const mailOptions = {
      from: `"NetComics 😎" <${process.env.GMAIL_USER}>`, // sender address
      to: user.email,
      subject: "Verify your email 🤩", // Subject line
      html: `<p>Xin chào ✌ ${user.fullName}</p> Xác thực email của bạn bằng cách click vào <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>đường link</a>`, // html body
    };

    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
  } catch (error) {
    console.log(error, "Error sending mail");
  }
};

module.exports = { sendVerificationMail };
