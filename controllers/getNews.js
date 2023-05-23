const { News } = require('../models/newsModel');
const { tryCatchWrapper } = require('../utils/index');
const { HttpError } = require('../helpers/index');

const getAllNews = async (req, res, next) => {
  const { page, per_page } = req.query;
  const news = await News.find();
  if (!news) {
    throw HttpError(404`News not found`);
  }
  let begin = 0;
  if (page) {
    begin = page * 10 - 10;
  }
  let end = 10;
  if (per_page) {
    end = per_page;
  }
  const total = news.length;

  const onePage = news.splice(begin, end);

  res.json({
    result: onePage,
    totalNews: total,
    page: page,
    per_page: per_page,
  });
};

module.exports = { getAllNews: tryCatchWrapper(getAllNews) };
