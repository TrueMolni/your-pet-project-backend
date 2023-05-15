import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../utils/handleMongooseError.js";

const emailRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegex, unique: true, required: true },
    password: {
      type: String,
      minlength: 5,
      required: true,
    },
    token:{type:String,default:""},
    // subscription:{type:String,enum:['starter', 'pro', 'business'],default:"starter",}
  },
  { versionKey: false, timestamps: true }
  );
  
  userSchema.post("save",handleMongooseError);
  
export const User = model("user",userSchema);

const registerScheme = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().pattern(emailRegex).required(),
    password:Joi.string().min(5).required(),
});

const loginScheme = Joi.object({
    email:Joi.string().pattern(emailRegex).required(),
    password:Joi.string().min(5).required(),
});

// const subscriptionScheme = Joi.object({
//   subscription: Joi.string().valid('starter', 'pro', 'business').required(),
// })

export const schemes = {
    registerScheme,
    loginScheme,
    // subscriptionScheme
};