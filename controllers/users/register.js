const { User } = require("../../models/users");
const nodemailer = require("nodemailer");
const { nodemailerConfig } = require("../../config");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");

require("dotenv").config();
const { PORT, UKR_NET_EMAIL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const transporter = nodemailer.createTransport(nodemailerConfig);
  const info = {
    from: UKR_NET_EMAIL,
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await transporter
    .sendMail(info)
    .then(() => console.log("Email send success"))
    .catch(console.error);
 

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
