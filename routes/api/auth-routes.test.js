const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

// const DB_TEST =
//   'mongodb+srv://Pet:lPOh2LCZlN53mVeI@cluster0.qsaqd2i.mongodb.net/pets_reader_test?retryWrites=true&w=majority';
const { DB_TEST } = process.env;

const app = require('../../app');
const { User } = require('../../models/users');

describe('test /api/users/register route', () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(3030);
    await mongoose.connect(DB_TEST);
  });

  afterAll(async () => {
    await User.deleteMany({});
    server.close();
    await mongoose.connection.close();
  });

  //   beforeEach(() => {});

  afterEach(async () => {
    // await User.deleteMany({});
  });

  test('test register route with correct data', async () => {
    const registerData = {
      email: 'panasonic@mail.com',
      password: '123456',
      confirmPassword: '123456',
    };

    const res = await request(app)
      .post('/api/users/register')
      .send(registerData);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
    expect(user.token).toBe(res.body.token);
  });

  test('test login route with correct data', async () => {
    const loginData = {
      email: 'panasonic@mail.com',
      password: '123456',
    };

    const res = await request(app).post('/api/users/login').send(loginData);
    expect(res.statusCode).toBe(200);

    const user = await User.findOne({ email: loginData.email });
    expect(user.token).toBe(res.body.token);
  });
});
