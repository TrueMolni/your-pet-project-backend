const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// const contactsRouter = require('./routes/api/announcements');
const noticeRouter = require('./routes/api/notices');

const { errorHandler } = require('./helpers/apiHelpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/contacts', contactsRouter);
app.use('/api/notices', noticeRouter);

app.use(errorHandler); // Кастомний обробник помилок

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
