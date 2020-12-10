const request = require('supertest')
const assert = require('assert')
const app = require('../../app')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const MockDataService = require('./mockData')
const bcrypt = require('bcrypt')
const User = require('../../models/user.model')
jest.mock('../../models/user.model')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/articles`;
  await mockgoose.prepareStorage().then( async function() {
    await mongoose.connect(url, { useNewUrlParser: true });
  });
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('User creation', () => {
  it('should create user on request from non-user', async () => {
    await request(app)
      .post('/user')
      .send({
        Email: 'hans@hansen.no',
        GivenName: 'Hans',
        FamilyName: 'Hansen',
        Password: 'nesnahsnah21'
      })
      .expect(201)
  })
})

describe('User login', () => {
  it('should login user', async () => {

    User.findOne.mockResolvedValue({
      Password: "$2b$10$7MKiQjWq3AlvaenoA0MbjuLJ/AawuzQkmnZ.vIX9J0SYVOILprhNy"
    })
    await request(app)
      .put('/user')
      .send({
        Email: 'hans@hansen.no',
        Password: 'nesnahsnah21'
      })
      .expect(200)
  })

  it('should not login user with wrong password', async () => {
    User.findOne.mockResolvedValue({
      Password: "$2b$10$7MKiQjWq3AlvaenoA0MbjuLJ/AawuzQkmnZ.vIX9J0SYVOILprhNy"
    })
    await request(app)
      .put('/user')
      .send({
        Email: 'hans@hansen.no',
        Password: 'nesnahsnh21'
      })
      .expect(401)
  })
})
