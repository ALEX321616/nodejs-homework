const multer = require("multer");
const { multerConfig } = require("../config");

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
