const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

mongoose.set('strictQuery', true); // запити до БД мають відповідати схемі, тобто якщо деяке поле має тип String, а запит передає це поле як число, то запит буде відхилений і повернеться помилка.

const PORT = process.env.PORT || 3030;
const DB = process.env.MONGO_URL;
const HOST = process.env.HOST;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, HOST, () => {
      console.log(`Server started: http://${HOST}:${PORT}/api/`);
    })
  )
  .catch(error => {
    console.log(`Can not connect to database, ${error.message}`);
    process.exit(1);
  });
