const express = require('express');
const router = express.Router();

const { notices: controller } = require('../../controllers');
// const validation = require('../../middlewares/validation');
// const { noticeSchema } = require('../../models/noticeModel');

const { authenticate, uploadNotice } = require('../../middlewares');

router.get('/', controller.getAllNotices); //! {видалити} 0 ендпоінт для отримання всіх оголошень

router.get('/search', controller.getNoticesByTitle);
router.get('/category/:categoryId', controller.getNoticesByCategory);
router.get('/own', authenticate, controller.getUserNotices); // 8
router.get('/favorites', authenticate, controller.getNoticeByFavorite); // 5 ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
router.get('/:noticeId', controller.getNoticeById);
router.patch('/favorite/:noticeId', authenticate, controller.updateFavorite); // 4-6
// router.patch('/favorite/:noticeId', authenticate, validation(noticeSchema), asyncWrapper(controller.updateFavorite)); //! 4-6 ?? validation(noticeSchema)
router.post(
  '/notice',
  authenticate,
  uploadNotice.single('image'),
  controller.addNoticeByCategory
); // 7
router.delete('/:noticeId', authenticate, controller.deleteNoticeById); // 9

module.exports = router;
