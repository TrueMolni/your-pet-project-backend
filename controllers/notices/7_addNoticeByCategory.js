// const cloudinary = require('cloudinary').v2;
// const fs = require('fs/promises');
// const { HttpError } = require('../../helpers');
// const { Notice } = require('../../models/noticeModel');

// const addNoticeByCategory = async (req, res) => {
//   const { _id: owner } = req.user;
//   if (!req.file) {
//     throw HttpError(400, 'Avatar is required');
//   }
//   console.log('req.file >>>>', req.file);

//   const { path: tempUpload } = req.file;

//   const { url } = await cloudinary.uploader.upload(tempUpload, {
//     width: 600,
//     height: 600,
//     crop: 'fill',
//     gravity: 'center',
//   });
//   const avatarURL = url;

//   const result = await Notice.create({
//     ...req.body,
//     avatarURL,
//     owner,
//   });
//   fs.unlink(tempUpload);

//   res.status(201).json({ notice: result });
// };

// module.exports = addNoticeByCategory;

// const cloudinary = require('cloudinary').v2;
// const fs = require('fs/promises');

// const { HttpError } = require('../../helpers');
const { Notice } = require('../../models/noticeModel');

const addNoticeByCategory = async (req, res) => {
  const { _id: owner } = req.user;

  // console.log('req >>>>>', req);

  // if (!req.file) {
  //   throw HttpError(400, 'Avatar is required');
  // }

  const newNotice = req.file
    ? { avatarURL: req.file.path, owner, ...req.body }
    : { owner, ...req.body };

  // const { path: tempUpload } = req.file;
  // const { url } = await cloudinary.uploader.upload(tempUpload); // Завантаження тимчасового файлу на Cloudinary
  // const avatarURL = url;

  const result = await Notice.create({
    ...newNotice,
  });
  // const result = await Notice.create({
  //   ...req.body,
  //   avatarURL,
  //   owner,
  // });
  // fs.unlink(tempUpload); // Видалення тимчасового файлу з файлової системи

  res.status(201).json({ notice: result });
};

module.exports = addNoticeByCategory;
