// Контролер не по ТЗ
// Можна видилити по завершенню проекту
// Виводить всі оголошення

const { Notice } = require('../../models/noticeModel');

const getAllNotices = async (req, res, next) => {
  const notices = await Notice.find();
  console.log(notices);
  res.json(notices);
};

module.exports = getAllNotices;
