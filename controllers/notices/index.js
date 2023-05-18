const getAllNotices = require('./0_getAllNotices');
const getNoticesByTitle = require('./1_getNoticesByTitle');
const getNoticesByCategory = require('./2_getNoticesByCategory');
const getNoticeById = require('./3_getNoticeById');
const updateFavorite = require('./4_updateFavorite');
const getAllNoticesByAuthUserAddedToFavorites = require('./5_getAllNoticesByAuthUserAddedToFavorites');
const delNoticeByAuthUserAddedToFavorites = require('./6_delNoticeByAuthUserAddedToFavorites');
const addNoticeByIdCategory = require('./7_addNoticeByIdCategory');
const getNoticesAuthUserByIdUser = require('./8_getNoticesAuthUserByIdUser');
const delNoticesAuthUserByIdUser = require('./9_delNoticesAuthUserByIdUser');
const addNewNotice = require('./10_addNewNotice');

module.exports = {
  getAllNotices,
  getNoticesByTitle,
  getNoticesByCategory,
  getNoticeById,
  updateFavorite,
  getAllNoticesByAuthUserAddedToFavorites,
  delNoticeByAuthUserAddedToFavorites,
  addNoticeByIdCategory,
  getNoticesAuthUserByIdUser,
  delNoticesAuthUserByIdUser,
  addNewNotice,
};
