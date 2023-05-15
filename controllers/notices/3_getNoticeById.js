const { NotFound } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getNoticeById = async (req, res, next) => {
  const { noteceId } = req.params;

  const result = await Notice.findById(noteceId);
  if (!result) {
    throw new NotFound(`Notice with id=${noteceId} not found`);
  }
  res.status(200).json({ result });
};

module.exports = getNoticeById;
