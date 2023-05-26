const { NotFound } = require('http-errors');

const { HttpError } = require('../../helpers');
const { Notice } = require('../../models/noticeModel');

const getNoticesByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const unsortedNotices = await Notice.find({
    category: categoryId,
  });

  if (unsortedNotices.length === 0) {
    throw new NotFound(`Notice with category "${categoryId}" not found`);
  }
  if (!unsortedNotices) {
    throw HttpError(404);
  }

  const result = [...unsortedNotices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.status(200).json({ count: result.length, data: result });
};

module.exports = getNoticesByCategory;
