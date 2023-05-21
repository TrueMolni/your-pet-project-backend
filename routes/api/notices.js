const express = require('express');
const router = express.Router();

const { notices: controller } = require('../../controllers');
// const validation = require('../../middlewares/validation');
// const { noticeSchema } = require('../../models/noticeModel');

const { authenticate, uploadNotice } = require('../../middlewares');

router.get('/', controller.getAllNotices); //! {видалити} 0 ендпоінт для отримання всіх оголошеннь

router.get('/search', controller.getNoticesByTitle);
router.get('/category/:categoryId', controller.getNoticesByCategory);
router.get('/:noticeId', controller.getNoticeById);
router.patch('/favorite/:noticeId', authenticate, controller.updateFavorite); //! 4
// router.patch(
//   '/favorite/:noticeId',
//   authenticate,
//   validation(noticeSchema),
//   asyncWrapper(controller.updateFavorite)
// ); //! 4

router.get('/favorite', authenticate, controller.getNoticeByFavorite); // 5 ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані

// router.delete('/:userid/:id/favorite', controller.delNoticeByAuthUserAddedToFavorites);
// 6 ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних

router.post(
  '/notice',
  authenticate,
  uploadNotice.single('image'),
  controller.addNoticeByCategory
);

router.get('/:userid/notices', controller.getNoticesAuthUserByIdUser); //! 8 ендпоінт для отримання оголошень авторизованого користувача створених цим же користувачем

router.delete('/:userid/:id/', controller.delNoticesAuthUserByIdUser); // 9 ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем

module.exports = router;
