const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const newAvatarName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, newAvatarName);
    const avatarURL = path.join("public", "avatars", newAvatarName);
    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    await Jimp.read(avatarURL)
      .then((img) => {
        return img.resize(250, 250).write(avatarURL);
      })
      .catch((err) => {
        console.error(err);
      });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
