const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const cloudinary = require('cloudinary').v2;

const swaggerDocument = require('./swagger.json');

const noticeRouter = require('./routes/api/notices');
const MyPetRouter = require('./routes/api/myPet');
const authRouter = require('./routes/api/auth-routes.js');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL2 });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', authRouter);
app.use('/api/notices', noticeRouter);
app.use('/api/pet', MyPetRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({ message: err.message });
});

module.exports = app;
