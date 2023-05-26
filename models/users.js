const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },

    name: { type: String, require: false },
    avatar: { type: String, require: false },
    phone: {
      type: Number,
      require: false,
    },
    city: {
      type: String,
      require: false,
    },
    birthday: {
      type: String,
      require: false,
    },
    favoriteNotices: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: 'notices',
    },
  },
  { versionKey: false, timestamps: true }
);

const infoUserSchema = Joi.object({
  avatar: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
  city: Joi.string(),
  birthday: Joi.number(),
});
const infoUserStringsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
  city: Joi.string(),
  birthday: Joi.number(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),

  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),

  email: Joi.string().required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  infoUserSchema,
  loginJoiSchema,
  infoUserStringsSchema,
};
