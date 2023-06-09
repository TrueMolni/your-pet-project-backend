const { HttpError } = require('../helpers');
const { User, loginJoiSchema, infoUserSchema,infoUserStringsSchema } = require('../models/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const queryString = require('query-string');
const gravatar = require('gravatar');
const cloudinary = require('cloudinary').v2;

// const fs =require("fs/promises") ;
// const path =require("path") ;
// const Jimp =require("jimp") ;
require('dotenv').config();

// const avatarsDir = path.join(__dirname, "../", "public", "usersPhotos");

const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  const userEmail = userData.data.email;
  const userId = userData.data.id;
  const userName = userData.data.name;
  const payload = { id: userId };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.create({
    name: userName,
    token,
    email: userEmail,
    password: userId + userName,
  });
  // res.json({ token });

  return res.redirect(`${process.env.FRONTEND_URL}/your-pet-project-frontend`);
};

// const ctrlRegisterUser = async (req, res) => {
//   const {password } = req.body;
//   const { error } = loginJoiSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.message);
//   }
//   const hashPassword = await bcrypt.hash(password, 10);
//   const result = await User.create({ ...req.body, password: hashPassword });

//   res.status(201).json({ email: result.email });
// };

const ctrlRegisterUser = async (req, res) => {
  const { password,email } = req.body;
  const photo = gravatar.url(email);
  const { error } = loginJoiSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = { ...req.body,photo, password: hashPassword };
  const user = await User.create(newUser);
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  user.token = token;
  await user.save();
  res.status(201).json({ token, email: user.email });
};

const ctrlLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'email or password wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'email or password invalid');
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

const ctrlLogOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.json({ message: 'LogOut success' });
};

const ctrlVerifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw HttpError(401, 'User not found');
    }
    res.json({ message: 'User is authenticated', user });
  } catch (err) {
    throw HttpError(401, 'User is not authenticated');
  }
};
const ctrlAddUserInfo = async (req, res) => {

  cloudinary.config({
    cloud_name: "ddinaq6n3",
    api_key: "149358935256577",
    api_secret: "yZ1Z3Y6t9OmL_yHQbk5WESOp570",

  });
  const { _id } = req.user;
  const {filename} = req.file;
  const url = cloudinary.url(filename,{width: 180,
    height: 180,
    Crop: 'fill'})
    console.log(url)
 // const avatarURL = path;

  await User.findByIdAndUpdate(_id, { avatar:url });
  const { error } = infoUserSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { name, birthday, email, phone, city } = req.body;
  const result = await User.findByIdAndUpdate(_id, {
    name,
    birthday,
    email,
    phone,
    city,
  });
  if (!result) {
    throw HttpError(404, `User with id ${_id} not found:(`);
  }
const data = {name,
  avatar:url,
  birthday,
  email,
  phone,
  city}
  res.json(data);
};

const ctrlGetUserInfo = async (req, res) => {
  const { _id } = req.user;

  const result = await User.find(_id,"name email phone avatar city birthday");
  if (!result) {
    throw HttpError(404, `User with id ${_id} not found:(`);
  }

  res.json(result);
};

const ctrlAddUserInfoString = async (req, res) => {
  const { _id } = req.user;
  console.log("1",req.body)
  const { error } = infoUserStringsSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { name, birthday, email, phone, city } = req.body;
  const result = await User.findByIdAndUpdate(_id, {
    name,
    birthday,
    email,
    phone,
    city,
  });
  if (!result) {
    throw HttpError(404, `User with id ${_id} not found:(`);
  }
const data = {name,
  birthday,
  email,
  phone,
  city}
  res.json(data);
};
const ctrls = {
  ctrlAddUserInfo,
  ctrlGetUserInfo,
  googleAuth,
  googleRedirect,
  ctrlRegisterUser,
  ctrlLoginUser,
  ctrlLogOut,
  ctrlVerifyUser,
  ctrlAddUserInfoString
};
module.exports = ctrls;