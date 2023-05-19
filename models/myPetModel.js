const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../utils/index');

const MyPetSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name pet'],
  },
  date: {
    type: String,
    require: true,
  },
  breed: { type: String },
  comments: { type: String },
  avatarURL: { type: String },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

MyPetSchema.post('save', handleMongooseError);

const joiSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  date: Joi.string().required(),
  breed: Joi.string(),
  comments: Joi.string(),
  avatarURL: Joi.string(),
});

const MyPet = model('pet', MyPetSchema);

module.exports = {
  MyPet,
  joiSchema,
};
