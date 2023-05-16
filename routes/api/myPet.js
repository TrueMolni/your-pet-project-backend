const express = require('express');

const router = express.Router();

const {
  removeMyPet,
  addMyPet,
  // addAvatar,
} = require('../../controllers/myPet/index');

// const { validateBody } = require("../../utils/index");
const { joiSchema } = require('../../models/myPetModel');
const { uploadCloud, validation } = require('../../middlewares/index');

router.post('/', validation(joiSchema), uploadCloud.single('avatar'), addMyPet);

// router.patch("/avatar", uploadCloud.single("avatar"), addAvatar);

router.delete('/:petId', removeMyPet);

module.exports = router;
