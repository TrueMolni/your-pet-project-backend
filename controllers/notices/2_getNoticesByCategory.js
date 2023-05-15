const { NotFound } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getNoticesByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  console.log('categoryId >>>>>>', categoryId);
  //   const { categoryId } = req.query;
  const result = await Notice.find({
    category: categoryId,
  });
  if (result.length === 0) {
    throw new NotFound(`Notice with category=${categoryId} not found`);
  }
  res.status(200).json({ result });
};

module.exports = getNoticesByCategory;
