const { NotFound } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getNoticesByTitle = async (req, res, next) => {
  const { title } = req.query;

  if (!title) {
    throw new NotFound('Title is required');
  }

  const result = await Notice.find({
    title: { $regex: new RegExp(title || '', 'i') },
  });
  if (result.length === 0) {
    throw new NotFound(`Notice with title=${title} not found`);
  }
  res.status(200).json({ count: result.length, data: result });
};

module.exports = getNoticesByTitle;
