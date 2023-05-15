// проміжний обробник, який обробляє всі помилки. Детально тут → https://youtu.be/-qk4ieNwp7U?t=6945

// const asyncWrapper = controller => {
//   return (req, res, next) => {
//     controller(req, res).catch(next);
//   };
// };

//! Або такий варіант
const asyncWrapper = controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// Кастомний обробник помилок → https://youtu.be/yUSIfa5J19o?t=5616
const errorHandler = (error, req, res, next) => {
  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
