const cloudinary = require('cloudinary').v2;
const { MyPet } = require('../../models/myPetModel');
const { tryCatchWrapper } = require('../../utils/index');

const addMyPet = async (req, res) => {
  const { _id: owner } = req.user;

  const { path } = req.file;

  const { url } = await cloudinary.uploader.upload(path, {
    width: 150,
    height: 150,
    crop: 'fill',
    gravity: 'center',
  });

  const newPet = req.file
    ? { avatarURL: url, owner, ...req.body }
    : { owner, ...req.body };

  const result = await MyPet.create({
    ...newPet,
  });

  res.status(201).json(result);
};

module.exports = { addMyPet: tryCatchWrapper(addMyPet) };
