const { NotFound } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;

  const result = await Notice.findById(noticeId);
  if (!result) {
    throw new NotFound(`Notice with id=${noticeId} not found`);
  }
  res.status(200).json({ result });
};

module.exports = getNoticeById;
