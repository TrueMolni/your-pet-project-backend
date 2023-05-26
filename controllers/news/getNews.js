const { News } = require('../../models/newsModel');
const { tryCatchWrapper } = require('../../utils/index');
const { HttpError } = require('../../helpers/index');

const getAllNews = async (req, res, next) => {
  const { page, perPage } = req.query;
  const news = await News.find();
  if (!news) {
    throw HttpError(404, `News not found`);
  }
  let begin = 0;
  let end = 10;
  if (page && !perPage) {
    begin = page * end - end;
  } else if (perPage && !page) {
    end = perPage;
  } else if (page && perPage) {
    begin = page * perPage - perPage;
    end = perPage;
  }
  const total = news.length;

  const onePage = news.splice(begin, end);

  res.json({
    result: onePage,
    totalNews: total,
    page: page || 1,
    perPage: end || 10,
  });
};

module.exports = { getAllNews: tryCatchWrapper(getAllNews) };
