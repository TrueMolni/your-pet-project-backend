// const path = require("path");
// const { rename } = require("fs/promises");
const { tryCatchWrapper } = require('../../utils/index');
const { MyPet } = require('../../models/myPetModel');
// const Jimp = require("jimp");

// const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const addAvatar = async (req, res) => {
  const { petId } = req.params;
  const { path, filename } = req.file;
  // const avatarName = `${_id}_${filename}`;
  // const resultUpload = path.join(avatarsDir, avatarName);
  // await rename(tempUpload, resultUpload);
  // Jimp.read(resultUpload, (err, avatar) => {
  //   if (err) throw err;
  //   avatar.resize(250, 250).write(resultUpload);
  // });
  // const avatarURL = path.join("avatars", avatarName);

  const avatarURL = path;

  await MyPet.findByIdAndUpdate(petId, { avatarURL });

  res.json({ avatarURL });
};

module.exports = { addAvatar: tryCatchWrapper(addAvatar) };
