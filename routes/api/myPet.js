const express = require('express');

const router = express.Router();

const { removeMyPet, addMyPet } = require('../../controllers/myPet/index');

const { joiSchema } = require('../../models/myPetModel');
const {
  uploadCloud,
  validation,
  authenticate,
} = require('../../middlewares/index');

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  uploadCloud.single('avatar'),
  addMyPet
);

router.delete('/:petId', authenticate, removeMyPet);

module.exports = router;
