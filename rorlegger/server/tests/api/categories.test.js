const request = require('supertest')
const assert = require('assert')
const app = require('../../app')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
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

describe('Category creation', () => {

  it('should create categories for user', async () => {
    await request(app)
      .post('/category')
      .set('Authorization', 'Bearer ' + await AuthService.createUserToken())
      .send({
        Name: 'Football'
      })
      .expect(201)
    await request(app)
      .post('/category')
      .set('Authorization', 'Bearer ' + await AuthService.createUserToken())
      .send({
        Name: 'Football'
      })
      .expect(201)
  })

  it('should not create category for non-user', async () => {
    await request(app)
      .post('/category')
      .send({
        Name: 'Football'
      })
      .expect(401)
  })
})

describe('fetching of categories', () => {
  it('should get 2 categories', async () => {
    await request(app)
      .get('/category')
      .expect(200)
  })
})
