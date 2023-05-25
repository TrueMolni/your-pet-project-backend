const { News } = require('../../models/newsModel');
const { tryCatchWrapper } = require('../../utils/index');
const { HttpError } = require('../../helpers/index');

const getNewsByTitle = async (req, res, next) => {
  const { page, perPage, title } = req.query;

  if (!title) {
    throw HttpError(400, `Title is require`);
  }
  const news = await News.find({
    title: { $regex: new RegExp(title || '', 'i') },
  });
  if (news.length === 0) {
    throw HttpError(404, `News with title ${title} not found`);
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

module.exports = { getNewsByTitle: tryCatchWrapper(getNewsByTitle) };
