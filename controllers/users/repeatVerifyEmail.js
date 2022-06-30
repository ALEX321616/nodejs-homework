const { User } = require("../../models/users");
const { BadRequest } = require("http-errors");
const nodemailer = require("nodemailer");
const { nodemailerConfig } = require("../../config");

require("dotenv").config();
const { PORT, UKR_NET_EMAIL } = process.env;
const repeatVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw BadRequest("missing required field email");
  }
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }

  const transporter = nodemailer.createTransport(nodemailerConfig);
  const info = {
    from: UKR_NET_EMAIL,
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}">Подтвердить email</a>`,
  };

  await transporter
    .sendMail(info)
    .then(() => console.log("Email send success"))
    .catch(console.error);

  res.json({
    email,
  });
};

module.exports = repeatVerifyEmail;
