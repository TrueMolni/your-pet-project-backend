const { asyncWrapper } = require('../../helpers/apiHelpers');

const getAllNotices = require('./0_getAllNotices');
const getNoticesByTitle = require('./1_getNoticesByTitle');
const getNoticesByCategory = require('./2_getNoticesByCategory');
const getNoticeById = require('./3_getNoticeById');
const updateFavorite = require('./4_updateFavorite');
const getNoticeByFavorite = require('./5_getNoticeByFavorite');
const delNoticeByAuthUserAddedToFavorites = require('./6_delNoticeByAuthUserAddedToFavorites');
const addNoticeByCategory = require('./7_addNoticeByCategory');
const getNoticesAuthUserByIdUser = require('./8_getNoticesAuthUserByIdUser');
const delNoticesAuthUserByIdUser = require('./9_delNoticesAuthUserByIdUser');

module.exports = {
  getAllNotices: asyncWrapper(getAllNotices),
  getNoticesByTitle: asyncWrapper(getNoticesByTitle),
  getNoticesByCategory: asyncWrapper(getNoticesByCategory),
  getNoticeById: asyncWrapper(getNoticeById),
  updateFavorite: asyncWrapper(updateFavorite),
  getNoticeByFavorite: asyncWrapper(getNoticeByFavorite),
  delNoticeByAuthUserAddedToFavorites: asyncWrapper(
    delNoticeByAuthUserAddedToFavorites
  ),
  addNoticeByCategory: asyncWrapper(addNoticeByCategory),
  getNoticesAuthUserByIdUser: asyncWrapper(getNoticesAuthUserByIdUser),
  delNoticesAuthUserByIdUser: asyncWrapper(delNoticesAuthUserByIdUser),
};
