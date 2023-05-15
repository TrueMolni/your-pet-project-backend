const express = require('express');
const router = express.Router();

const { notices: controller } = require('../../controllers');

const validation = require('../../middlewares/validation');
const { noticeSchema } = require('../../models/noticeModel');
const { asyncWrapper } = require('../../helpers/apiHelpers');

router.get('/', asyncWrapper(controller.getAllNotices)); //! {видалити} 0 ендпоінт для отримання всії оголошеннь
router.post('/', asyncWrapper(controller.addNewNotice)); //! {видалити} 10 ендпоінт для створення нового оголошення
// router.post('/new/', validation(noticeSchema), asyncWrapper(controller.addNewNotice) ); //! {видалити} 10 ендпоінт для створення нового оголошення

router.get('/search', asyncWrapper(controller.getNoticesByTitle)); // 1 ендпоінт для пошуку оголошеннь по заголовку

router.get(
  '/category/:categoryId',
  asyncWrapper(controller.getNoticesByCategory)
); // 2 ендпоінт для отримання оголошень по категоріям

router.get('/:noteceId', asyncWrapper(controller.getNoticeById)); // 3 ендпоінт для отримання одного оголошення

router.post(
  '/:id/favourite',
  validation(noticeSchema),
  asyncWrapper(controller.addNoticeToFavorite)
); // 4 ендпоінт для додавання оголошення до обраних

router.get(
  '/:userid/:id/favourite',
  asyncWrapper(controller.getAllNoticesByAuthUserAddedToFavorites)
); // 5 ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані

router.delete(
  '/:userid/:id/favourite',
  asyncWrapper(controller.delNoticeByAuthUserAddedToFavorites)
); // 6 ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних

router.post(
  '/:id/:categoryId',
  validation(noticeSchema),
  asyncWrapper(controller.addNoticeByIdCategory)
); // 7 ендпоінт для додавання оголошень відповідно до обраної категорії

router.get(
  '/:userid/:id/',
  asyncWrapper(controller.getNoticesAuthUserByIdUser)
); // 8 ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем

router.delete(
  '/:userid/:id/',
  asyncWrapper(controller.delNoticesAuthUserByIdUser)
); // 9 ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем

module.exports = router;
