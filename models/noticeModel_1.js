const { model } = require('mongoose');
const Joi = require('joi');

const noticeSchema = Joi.object({
  category: Joi.string()
    .valid('my pet', 'sell', 'lost-found', 'for-free')
    .required()
    .messages({
      'any.required': 'Select a category for the notice',
      'any.only': 'Invalid category',
    }),

  name: Joi.string().required().min(2).max(16).messages({
    'any.required': 'Set a name for the notice',
    'string.min': 'Name must have at least 2 characters',
    'string.max': 'Name cannot exceed 16 characters',
  }),

  date: Joi.date().required().messages({
    'any.required': 'Provide a date for the notice',
    'date.base': 'Invalid date format',
  }),

  breed: Joi.string().required().min(2).max(16).messages({
    'any.required': 'Set a breed for the notice',
    'string.min': 'Breed must have at least 2 characters',
    'string.max': 'Breed cannot exceed 16 characters',
  }),

  file: Joi.string()
    .required()
    .max(3 * 1024 * 1024)
    .messages({
      'any.required': 'Upload a file for the notice',
      'string.max': 'File size exceeds the limit (3MB)',
    }),

  sex: Joi.string()
    .valid('male', 'female')
    .when('category', {
      is: Joi.string().valid('sell', 'lost-found', 'for-free'),
      then: Joi.required(),
    }),

  location: Joi.string()
    .when('category', {
      is: Joi.string().valid('sell', 'lost-found', 'for-free'),
      then: Joi.required(),
    })
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.pattern.base': 'Location must be a string with letters only',
    }),

  price: Joi.number()
    .when('category', {
      is: 'sell',
      then: Joi.required(),
    })
    .min(1)
    .messages({
      'number.min': 'Price must be greater than 0',
    }),

  comments: Joi.string().min(8).max(120).messages({
    'string.min': 'Comments must have at least 8 characters',
    'string.max': 'Comments cannot exceed 120 characters',
  }),
});

// Модель без використання бібліотеки Joy
// const noticeSchema = new Schema(
//   {
//     category: {
//       type: String,
//       enum: ['my pet', 'sell', 'lost-found', 'for-free'],
//       required: [true, 'Select a category for the notice'],
//     },
//     name: {
//       type: String,
//       required: [true, 'Set a name for the notice'],
//       minlength: [2, 'Name must have at least 2 characters'],
//       maxlength: [16, 'Name cannot exceed 16 characters'],
//     },
//     date: {
//       type: Date,
//       required: [true, 'Provide a date in the format DD.MM.YYYY'],
//       default: Date.now(),
//       validate: {
//         validator: function (value) {
//           const regex = /^\d{2}.\d{2}.\d{4}$/;
//           return regex.test(value);
//         },
//         message: 'Invalid date format. Use the format DD.MM.YYYY',
//       },
//     },
//     breed: {
//       type: String,
//       required: [true, 'Set a breed for the notice'],
//       minlength: [2, 'Breed must have at least 2 characters'],
//       maxlength: [16, 'Breed cannot exceed 16 characters'],
//     },

//     file: {
//       type: String,
//       required: [true, 'Upload a file for the notice'],
//       validate: {
//         validator: function (value) {
//           // Перевірка на обмеження об'єму файлу (3 МБ)
//           const fileSizeLimit = 3 * 1024 * 1024; // 3 МБ у байтах
//           return value && value.length <= fileSizeLimit;
//         },
//         message: 'File size exceeds the limit (3MB)',
//       },
//     },

//     sex: {
//       type: String,
//       enum: ['male', 'female'],
//       required: function () {
//         // Поле "sex" є обов'язковим лише для категорій "sell", "lost-found", "for-free"
//         return ['sell', 'lost-found', 'for-free'].includes(this.category);
//       },
//     },
//     location: {
//       type: String,
//       required: function () {
//         // Поле "location" є обов'язковим лише для категорій "sell", "lost-found", "for-free"
//         return ['sell', 'lost-found', 'for-free'].includes(this.category);
//       },
//       match: [/^[A-Za-z\s]+$/, 'Location must be a string with letters only'],
//     },

//     price: {
//       type: Number,
//       required: function () {
//         // Поле "price" є обов'язковим лише для категорії "sell"
//         return this.category === 'sell';
//       },
//       min: [1, 'Price must be greater than 0'],
//     },

//     comments: {
//       type: String,
//       minlength: [8, 'Comments must have at least 8 characters'],
//       maxlength: [120, 'Comments cannot exceed 120 characters'],
//     },
//   },
//   {
//     versionKey: false, //вимикає автоматичне створення поля __v (версія) в записах бази даних MongoDB
//     timestamps: true, // вмикає автоматичне створення полів createdAt і updatedAt в записах бази даних MongoDB. Поле createdAt буде містити дату та час створення запису, а поле updatedAt буде містити дату та час останнього оновлення запису
//   }
// );

// const addJoiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });

// const favoriteJoiSchema = Joi.object({
//   favorite: Joi.boolean(),
// });

const Notice = model('pets', noticeSchema);

module.exports = { Notice };
// module.exports = { Notice, addJoiSchema, favoriteJoiSchema };
