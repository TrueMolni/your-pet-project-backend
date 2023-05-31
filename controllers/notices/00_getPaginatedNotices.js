const { NotFound, BadRequest } = require('http-errors');
const { Notice } = require('../../models/noticeModel');

const getPaginatedNotices = async (req, res, next) => {
  const { page } = req.query;

  if (!page) {
    throw new NotFound('Page number is not set');
  }
  const parsedPage = parseInt(page);
  if (isNaN(parsedPage) || parsedPage <= 0) {
    throw new BadRequest('Invalid page number');
  }

  const noticesPerPage = process.env.NOTICES_PER_PAGE;
  const skip = parseInt((page - 1) * noticesPerPage);

  const notices = await Notice.find().skip(skip).limit(noticesPerPage);

  const totalNotices = await Notice.countDocuments();
  const currentPageNotices = notices.length;

  res.json({
    totalNotices: totalNotices,
    currentPageTotal: currentPageNotices,
    data: notices,
  });
};

module.exports = getPaginatedNotices;
