const Joi = require('joi');
const { Schema, model } = require('mongoose');

// const validateDate = value => {
//   const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
//   return dateRegex.test(value);
// };

const validateLocation = (value, helpers) => {
  const regex = /^[A-Za-z\s\d_,-]+$/;
  if (!regex.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set a title for the animal'],
    },
    category: {
      type: String,
      enum: ['sell', 'lost-found', 'for-free'],
      default: 'sell',
      required: [true, 'Select a category for the notice'],
    },
    name: {
      type: String,
      required: [true, 'Set a name for the animal'],
    },
    date: {
      type: String,
      required: [true, 'Please, select a birth of your pet'],
    },
    breed: {
      type: String,
      required: [true, 'Set a breed for the animal'],
    },
    avatarURL: {
      type: String,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Please, select a sex of your pet'],
    },
    location: {
      type: String,
      required: [true, 'Please, select a location'],
    },
    price: {
      type: Number,
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddNoticeSchema = Joi.object({
  title: Joi.string().min(16).max(36).required(),
  category: Joi.string().valid('sell', 'lost-found', 'for-free').required(),
  name: Joi.string().min(2).max(16).required().messages({
    'string.min': 'Name must have at least 2 characters',
    'string.max': 'Name cannot exceed 16 characters',
  }),
  date: Joi.string().required(),
  // date: Joi.string()
  //   .custom(
  //     validateDate,
  //     'Provide a date for the notice in the format DD.MM.YYYY'
  //   )
  //   .required(),
  breed: Joi.string().min(2).max(24).required().messages({
    'string.min': 'Breed must have at least 2 characters',
    'string.max': 'Breed cannot exceed 24 characters',
  }),
  avatarURL: Joi.string()
    .max(3 * 1024 * 1024)
    .message('File size exceeds the limit (3MB)'),
  sex: Joi.string().valid('male', 'female').required(),
  location: Joi.string()
    .custom(
      validateLocation,
      'Location must be a string with letters, digits, spaces, underscores or dashes only'
    )
    .required(),
  price: Joi.number().when('category', {
    is: 'sell',
    then: Joi.number().min(0.01).required().messages({
      'any.required': 'Please, enter a price',
      'number.min': 'Price must be greater than $0.01',
    }),
    otherwise: Joi.number(),
  }),
  comments: Joi.string()
    .min(8)
    .message('Comments must have at least 8 characters')
    .max(120)
    .message('Comments cannot exceed 120 characters'),
});

const Notice = model('notices', noticeSchema);

module.exports = { Notice, joiAddNoticeSchema };
