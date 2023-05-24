const { NotFound } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getNoticesByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const result = await Notice.find({
    category: categoryId,
  });

  if (result.length === 0) {
    throw new NotFound(`Notice with category=${categoryId} not found`);
  }

  res.status(200).json({ count: result.length, data: result });
};

module.exports = getNoticesByCategory;
