//  перевірки правильності введення користувачем даних у формі, перед тим, як вони будуть збережені в базі даних.

const { HttpError } = require('../helpers');

const validation = schema => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validation;
