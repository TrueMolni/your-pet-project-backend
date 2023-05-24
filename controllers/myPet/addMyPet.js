const { MyPet } = require('../../models/myPetModel');
const { tryCatchWrapper } = require('../../utils/index');

const addMyPet = async (req, res) => {
  const { _id: owner } = req.user;

  const newPet = req.file
    ? { avatarURL: req.file.path, owner, ...req.body }
    : { owner, ...req.body };

  const result = await MyPet.create({
    ...newPet,
  });

  res.status(201).json(result);
};

module.exports = { addMyPet: tryCatchWrapper(addMyPet) };
