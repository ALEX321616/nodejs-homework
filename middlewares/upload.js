const multer = require("multer");
const multerConfig = require("../multer/multerConfig");

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
