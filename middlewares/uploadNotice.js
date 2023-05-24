const cloudinary = require('cloudinary').v2;
const multer = require('multer'); // бібліотека для обробки завантаження файлів у Node.js.
const path = require('path');
const { HttpError } = require('../helpers');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME2,
  api_key: process.env.CLOUDINARY_KEY2,
  api_secret: process.env.CLOUDINARY_SECRET2,
});

const tempDir = path.join(__dirname, '../', 'temp'); // шлях до тимчасової директорії, де будуть зберігатися завантажені файли.
const maxAvatarSize = 9000000; // максимальний розмір файлу, обмежений 9 мегабайтами.

// об'єкт, який містить конфігурацію для зберігання завантажених файлів. У цьому випадку, файли будуть зберігатися у тимчасовій директорії tempDir, а їхні оригінальні імена залишаються без змін.
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// функція фільтрації типів файлів
function fileFilter(req, file, cb) {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/bmp'
  ) {
    cb(null, true);
    return;
  }
  cb(null, false);
  cb(new HttpError(400, 'File format should be jpeg, png, jpg, bmp'));
}

// об'єкт, який ініціалізує multer з переданою конфігурацією storage, обмеженнями розміру файлу (limits) та функцією фільтрації файлів (fileFilter).
const uploadNotice = multer({
  storage: multerConfig,
  limits: { fileSize: maxAvatarSize },
  fileFilter,
});

module.exports = uploadNotice;
