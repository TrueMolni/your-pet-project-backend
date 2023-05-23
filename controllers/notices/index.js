const { asyncWrapper } = require('../../helpers/apiHelpers');

const getAllNotices = require('./0_getAllNotices');
const getNoticesByTitle = require('./1_getNoticesByTitle');
const getNoticesByCategory = require('./2_getNoticesByCategory');
const getNoticeById = require('./3_getNoticeById');
const updateFavorite = require('./4-6_updateFavorite');
const getNoticeByFavorite = require('./5_getNoticeByFavorite');
const addNoticeByCategory = require('./7_addNoticeByCategory');
const getUserNotices = require('./8_getUserNotices');
const deleteNoticeById = require('./9_deleteNoticeById');

module.exports = {
  getAllNotices: asyncWrapper(getAllNotices),
  getNoticesByTitle: asyncWrapper(getNoticesByTitle),
  getNoticesByCategory: asyncWrapper(getNoticesByCategory),
  getNoticeById: asyncWrapper(getNoticeById),
  updateFavorite: asyncWrapper(updateFavorite),
  getNoticeByFavorite: asyncWrapper(getNoticeByFavorite),
  addNoticeByCategory: asyncWrapper(addNoticeByCategory),
  getUserNotices: asyncWrapper(getUserNotices),
  deleteNoticeById: asyncWrapper(deleteNoticeById),
};
