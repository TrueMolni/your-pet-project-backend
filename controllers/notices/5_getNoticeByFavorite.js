const { Notice } = require('../../models/noticeModel');
const { HttpError } = require('../../helpers');

const getNoticeByFavorite = async (req, res) => {
  const { favoriteNotices } = req.user;
  console.log('favoriteNotices >>>>', favoriteNotices);

  const unsortedNotices = await Notice.find({ _id: favoriteNotices });

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
