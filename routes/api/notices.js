const express = require('express');
const router = express.Router();

const { notices: controller } = require('../../controllers');

const validation = require('../../middlewares/validation');
const { noticeSchema } = require('../../models/noticeModel');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authenticate, uploadNotice } = require('../../middlewares');

router.get('/', asyncWrapper(controller.getAllNotices)); //! {видалити} 0 ендпоінт для отримання всіх оголошеннь

router.get('/search', asyncWrapper(controller.getNoticesByTitle));

router.get(
  '/category/:categoryId',
  asyncWrapper(controller.getNoticesByCategory)
);

router.get('/:noticeId', asyncWrapper(controller.getNoticeById));

router.patch(
  '/favorite/:noticeId',
  validation(noticeSchema),
  asyncWrapper(controller.updateFavorite)
);

router.get(
  '/:userid/:id/favourite',
  asyncWrapper(controller.getAllNoticesByAuthUserAddedToFavorites)
); // 5 ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані

router.delete(
  '/:userid/:id/favourite',
  asyncWrapper(controller.delNoticeByAuthUserAddedToFavorites)
); // 6 ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних

router.post(
  '/notice',
  authenticate,
  uploadNotice.single('image'),
  asyncWrapper(controller.addNoticeByCategory)
);

router.get(
  '/:userid/:id/',
  asyncWrapper(controller.getNoticesAuthUserByIdUser)
); // 8 ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем

router.delete(
  '/:userid/:id/',
  asyncWrapper(controller.delNoticesAuthUserByIdUser)
); // 9 ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем

module.exports = router;
