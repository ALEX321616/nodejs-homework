require("dotenv").config();
const { UKR_NET_PASSWORD, UKR_NET_EMAIL, HOST_EMAIL, PORT_EMAIL } = process.env;

const nodemailerConfig = {
  host: HOST_EMAIL,
  port: PORT_EMAIL,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

module.exports = nodemailerConfig;
