const { MyPet } = require('../../models/myPetModel');
const { HttpError } = require('../../helpers/index');
const { tryCatchWrapper } = require('../../utils/index');

const addMyPet = async (req, res) => {
  const { name } = req.body;

  const pet = await MyPet.findOne({ name });
  if (pet) {
    throw HttpError(409, `Pet ${name} already in use`);
  }

  const { _id: owner } = req.user;

  const newPet = req.file
    ? { avatarURL: req.file.path, owner, ...req.body }
    : { owner, ...req.body };

  const result = await MyPet.create({
    ...newPet,
  });

  res.status(201).json({
    data: {
      ...result._doc,
    },
  });
};

module.exports = { addMyPet: tryCatchWrapper(addMyPet) };
