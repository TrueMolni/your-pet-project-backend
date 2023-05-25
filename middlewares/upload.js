const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// cloudinary.image("front_face.png", {
//   secure: true,
//   transformation: [
//     { width: 161, height: 161, gravity: "face", crop: "thumb" },
//     { radius: 20 },
//   ],
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'animals',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
