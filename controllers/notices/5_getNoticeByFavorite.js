// const { Notice } = require('../../models/noticeModel');
const { User } = require('../../models/users');

const { HttpError } = require('../../helpers');

// ? v4
// const getNoticeByFavorite = async (req, res) => {
//   const { favoriteNotices } = req.user;
//   console.log('favoriteNotices:', favoriteNotices); // Доданий рядок

//   const unsortedNotices = await Notice.find({ _id: favoriteNotices });

//   if (!unsortedNotices) {
//     throw HttpError(404);
//   }

//   const notices = [...unsortedNotices].sort(
//     (firstNotice, secondNotice) =>
//       new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
//   );

//   res.json({ notices });
// };

// ? v3
// const getNoticeByFavorite = async (req, res) => {
//   const user = await User.findById(req.user._id).lean();
//   console.log('req.user._ids >>>>', req.user._id);

//   const favoriteNotices = user.favoriteNotices || [];

//   console.log('favoriteNotices >>>>', favoriteNotices);

//   const notices = await Notice.find({ _id: { $in: favoriteNotices } });

//   if (!notices) {
//     throw HttpError(404);
//   }

//   res.json({ notices });
// };

// ? v2
// const getNoticeByFavorite = async (req, res) => {
//   const { favoriteNotices } = req.user;
//   console.log('favoriteNotices >>>>', favoriteNotices);

//   const notices = await Notice.find({ _id: { $in: favoriteNotices } });

//   if (!notices) {
//     throw HttpError(404);
//   }

//   res.json({ notices });
// };

// ? v1
const getNoticeByFavorite = async (req, res) => {
  const { favoriteNotices } = req.user;
  console.log('favoriteNotices >>>>', favoriteNotices);

  const unsortedNotices = await User.find({ _id: favoriteNotices });

  if (!unsortedNotices) {
    throw HttpError(404);
  }

  const notices = [...unsortedNotices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.json({ notices });
};

module.exports = getNoticeByFavorite;
