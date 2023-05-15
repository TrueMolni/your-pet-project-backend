// Контролер не по ТЗ
// Можна видилити по завершенню проекту
// Додає оголошення в БД

const { Notice } = require('../../models/noticeModel');

const addNewNotice = async (req, res, next) => {
  const result = await Notice.create(req.body);

  if (!result) {
    throw new Error('Failed to create new notice');
  }

  res.status(201).json(result);
};

module.exports = addNewNotice;
