const { HttpError } =require("../helpers/HttpError.js");
const { User, loginJoiSchema,infoUserSchema} =require("../models/users.js");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
const axios =require("axios");
const  queryString = require("query-string");
require("dotenv").config()

const { SECRET_KEY} = process.env;

const googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
  };
  
  const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });
    const userEmail = userData.data.email;
    const userId = userData.data.id;
    const userName = userData.data.name;
    const payload = { id: userId };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    
await User.create({name:userName,token,email:userEmail,password:userId+userName });
// res.json({ token });
   
    return res.redirect(
      `${process.env.FRONTEND_URL}/your-pet-project-frontend`
    );
  };

const ctrlRegisterUser = async (req, res) => {
  const {password } = req.body;
  const { error } = loginJoiSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ email: result.email });
};

const ctrlLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "email or password wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "email or password invalid");
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};


const ctrlLogOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "LogOut success" });
};

const ctrlUserInfo = async (req, res) => {
  const { error } = infoUserSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { name,age,gender,avatarUrl } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { name,age,gender,avatarUrl });
  if (!result) {
    throw HttpError(404, `User with id ${_id} not found:(`);
  }
  
  res.send(req.body);
};

const  ctrls ={
  ctrlUserInfo,
      googleAuth,
      googleRedirect,
      ctrlRegisterUser,
      ctrlLoginUser,
      ctrlLogOut,
    }
module.exports = ctrls;
// export const ctrlEmailVerify = async (req, res) => {
//     const { verificationToken } = req.params;
//     const user = await User.findOne({ verificationToken });
//     if (!user) {
//       throw HttpError(404, "User not found");
//     }
//     await User.findByIdAndUpdate(user._id, {
//       verify: true,
//       verificationToken: "",
//     });
//     res.json({ message: "Verification successful" });
//   };
  
//   export const ctrlResendVerifyEmail = async (req, res) => {
//     const { error } = schemes.emailVerifyScheme.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw HttpError(400, "User not found");
//     }
//     if (user.verify) {
//       throw HttpError(400, "Verification has already been passed");
//     }
//     const verifyEmail = {
//       to: email,
//       subject: "Verify email",
//       html: `<a targer="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click me to verify email</a>`,
//     };
//     await sendEmail(verifyEmail);
  
//     res.status(200).json({ message: "Verification email sent" });
//   };
  
