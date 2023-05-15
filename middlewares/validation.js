//  перевірки правильності введення користувачем даних у формі, перед тим, як вони будуть збережені в базі даних.

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
