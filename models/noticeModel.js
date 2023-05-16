const Joi = require('joi');
const { Schema, model } = require('mongoose');

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set a title for the animal'],
      minlength: [16, 'Title must have at least 16 characters'],
      maxlength: [35, 'Title cannot exceed 35 characters'],
    },

    category: {
      type: String,
      enum: ['sell', 'lost-found', 'for-free'],
      required: [true, 'Select a category for the notice'],
    },

    name: {
      type: String,
      required: [true, 'Set a name for the animal'],
      minlength: [2, 'Name must have at least 2 characters'],
      maxlength: [16, 'Name cannot exceed 16 characters'],
    },

    date: {
      type: String,
      required: true,
      default: Date.now(),
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
      required: [true, 'Set a breed for the animal'],
      minlength: [2, 'Breed must have at least 2 characters'],
      maxlength: [26, 'Breed cannot exceed 16 characters'],
    },

    avatarURL: {
      type: String,
      required: [true, 'Upload a file with a photo of the animal'],
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
  },
  {
    versionKey: false, // вимикає автоматичне створення поля __v (версія) в записах бази даних MongoDB
    timestamps: true, // вмикає автоматичне створення полів createdAt і updatedAt в записах бази даних MongoDB. Поле createdAt буде містити дату та час створення запису, а поле updatedAt буде містити дату та час останнього оновлення запису
  }
);

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean(),
});

const Notice = model('notices', noticeSchema);

module.exports = { Notice, favoriteJoiSchema };
