const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../utils/index');

const MyPetSchema = Schema({
  category: { type: String, default: 'your pet' },
  name: {
    type: String,
    required: [true, 'Set name pet'],
  },
  date: {
    type: String,
    require: true,
  },
  breed: { type: String },
  sex: { type: String },
  comments: { type: String },
  location: { type: String },
  price: { type: String },
  title: { type: String },
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
  sex: Joi.string(),
  comments: Joi.string(),
  location: Joi.string(),
  price: Joi.string(),
  title: Joi.string(),
  comments: Joi.string(),
  avatarURL: Joi.string(),
});

const MyPet = model('pet', MyPetSchema);

module.exports = {
  MyPet,
  joiSchema,
};
