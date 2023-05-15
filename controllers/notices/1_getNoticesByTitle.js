const { NotFound } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getNoticesByTitle = async (req, res, next) => {
  const { title } = req.query;
  const result = await Notice.find({
    name: { $regex: new RegExp(title, 'i') },
  });
  if (result.length === 0) {
    throw new NotFound(`Notice with title=${title} not found`);
  }
  res.status(200).json({ result });
};

module.exports = getNoticesByTitle;
