const request = require('supertest');
const app = require('../src/app');
const { resetState } = require('../src/data');

async function loginAsQa() {
  const res = await request(app)
    .post('/auth/login')
    .send({ username: 'qa', password: 'qa123' });

  return res.body.token;
}

module.exports = {
  request,
  app,
  resetState,
  loginAsQa
};
