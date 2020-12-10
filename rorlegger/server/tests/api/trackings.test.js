const request = require('supertest')
const assert = require('assert')
const app = require('../../app')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const MockService = require('./mockData')
const AuthService = require('./helpers/auth')


beforeAll(async () => {
  const url = `mongodb://127.0.0.1/articles`;
  await mockgoose.prepareStorage().then( async function() {
    await mongoose.connect(url, { useNewUrlParser: true });
  });
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('new entry', () => {

  it('should not store a new tracking without userId provided', async () => {
    await request(app)
      .post('/tracking')
      .set('Authorization', 'Bearer ' + await AuthService.createUserToken())
      .send(MockService.trackingEntry)
      .expect(400)
  })
})
