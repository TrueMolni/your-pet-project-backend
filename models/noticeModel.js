const Joi = require('joi');
const { Schema, model } = require('mongoose');

const noticeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Set a name for the notice'],
    minlength: [16, 'Name must have at least 16 characters'],
    maxlength: [60, 'Name cannot exceed 60 characters'],
  },

  category: {
    type: String,
    enum: ['my pet', 'sell', 'lost-found', 'for-free'],
    required: [true, 'Select a category for the notice'],
  },

  name: {
    type: String,
    required: [true, 'Set a name for the notice'],
    minlength: [2, 'Name must have at least 2 characters'],
    maxlength: [16, 'Name cannot exceed 16 characters'],
  },

  date: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Перевірка формату дати (22.10.2022)
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        return dateRegex.test(value);
      },
      message: 'Provide a date for the notice in the format DD.MM.YYYY',
    },
  },

  breed: {
    type: String,
    required: [true, 'Set a breed for the notice'],
    minlength: [2, 'Breed must have at least 2 characters'],
    maxlength: [26, 'Breed cannot exceed 16 characters'],
  },

  avatarURL: {
    type: String,
    required: [true, 'Upload a file for the notice'],
    maxlength: [3 * 1024 * 1024, 'File size exceeds the limit (3MB)'],
  },

  sex: {
    type: String,
    enum: ['male', 'female'],
    required: function () {
      return ['sell', 'lost-found', 'for-free'].includes(this.category);
    },
  },

  location: {
    type: String,
    required: function () {
      return ['sell', 'lost-found', 'for-free'].includes(this.category);
    },
    match: /^[A-Za-z\s\d_,-]+$/, // [літери верхнього та нижнього регістру (A-Z, a-z), пробіли, цифри, підкреслення, коми і тире.
    message:
      'Location must be a string with letters, digits, spaces, underscores or dashes only',
  },

  price: {
    type: Number,
    required: function () {
      return this.category === 'sell';
    },
    min: [1, 'Price must be greater than 0'],
  },

  comments: {
    type: String,
    minlength: [8, 'Comments must have at least 8 characters'],
    maxlength: [120, 'Comments cannot exceed 120 characters'],
  },
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean(),
});

const Notice = model('notices', noticeSchema);

module.exports = { Notice, favoriteJoiSchema };
