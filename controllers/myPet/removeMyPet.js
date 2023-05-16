const { MyPet } = require("../../models/myPetModel");

const { tryCatchWrapper } = require("../../utils/index");

const removeMyPet = async (req, res) => {
  const { petId } = req.params;
  const result = await MyPet.findByIdAndDelete(petId);
  if (!result) {
    throw HttpError(404`Pet with ${petId} not found`);
  }

  res.json({ message: "deleting is successful", result });
};

module.exports = { removeMyPet: tryCatchWrapper(removeMyPet) };
