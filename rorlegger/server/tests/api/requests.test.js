const request = require('supertest')
const assert = require('assert')
const app = require('../../app')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const MockService = require('./mockData')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/articles`;
  await mockgoose.prepareStorage().then( async function() {
    await mongoose.connect(url, { useNewUrlParser: true });
  });
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('User request', () => {
  it('should recieve a request from user and store in db', async () => {
    await request(app)
      .post('/request')
      .send(MockService.userRequest)
      .expect(201)
  })

  it('should fail when no email is recieved', async () => {
    await request(app)
      .post('/request')
      .send(MockService.userRequestWithoutEmail)
      .expect(400)
  })
})
