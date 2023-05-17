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
    avatarURL: {
      type: String,
      required: false,
    },
    name: { type: String, require: false },
    age: { type: Number, require: false },
    gender: {
      type: String,
      require: false,
      enum: ['male', 'female'],
      default: 'female',
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },
  },
  { versionKey: false, timestamps: true }
);

const infoUserSchema = Joi.object({
  avatarUrl: Joi.string(),
  name: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const User = model('user', userSchema);

module.exports = { User, infoUserSchema, loginJoiSchema };
// bcrypt,axios,queryString
