const { MyPet } = require('../../models/myPetModel');
const { tryCatchWrapper } = require('../../utils/index');
const { HttpError } = require('../../helpers/index');

const getMyPet = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await MyPet.find({ owner });
  if (!result) {
    throw HttpError(404, `Pets not found`);
  }
  res.json(result);
};

module.exports = { getMyPet: tryCatchWrapper(getMyPet) };
