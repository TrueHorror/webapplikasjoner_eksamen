const request = require('supertest')
const assert = require('assert')
const app = require('../../app')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const MockDataService = require('./mockData')
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

let idToOpenArticle;
let idToSecretArticle;

describe('Article creation', () => {

  it('should create open article', async () => {
    await request(app)
      .post('/article')
      .set('Authorization', 'Bearer ' + await AuthService.createAdminToken())
      .send(MockDataService.openArticleCreationSet)
      .expect(201)
      .then(response => {
        idToOpenArticle = response.body._id
      })
  })

  it('should create secret article', async () => {
    await request(app)
      .post('/article')
      .set('Authorization', 'Bearer ' + await AuthService.createAdminToken())
      .send(MockDataService.secretArticleCreationSet)
      .expect(201)
      .then(response => {
        idToSecretArticle = response.body._id
      })
  })

  it('should only be possible to do by admin', async () => {
    await request(app)
      .post('/article')
      .set('Authorization', 'Bearer ' + await AuthService.createUserToken())
      .send(MockDataService.secretArticleCreationSet)
      .expect(401)
    await request(app)
      .post('/article')
      .send(MockDataService.secretArticleCreationSet)
      .expect(401)
  })
})

describe('Fetching of articles', () => {

  it('should send only the non-secret article for a non-user', async () => {
    await request(app)
      .get('/articles/non-secret')
      .expect(200)
      .then(response => {
        assert.equal(response.body.articles.length, 1)
      })
  })

  it('should send both articles for a user', async () => {
    await request(app)
      .get('/articles/secret')
      .set('Authorization', 'Bearer ' + await AuthService.createUserToken())
      .expect(200)
      .then(response => {
        assert.equal(response.body.articles.length, 2)
      })
  })

  it('should not send both articles to a non-user', async () => {
    await request(app)
      .get('/articles/secret')
      .expect(401)
  })
})

describe('Fetching of single articles', () => {

  it('should send open article to non-user', async () => {
    await request(app)
      .get('/article/non-secret?id=' + idToOpenArticle)
      .expect(200)
      .then(response => {
        assert.equal(response.body.article._id, idToOpenArticle)
      })
  })

  it('should send secret article to user', async () => {
    await request(app)
      .get('/article/secret?id=' + idToSecretArticle)
      .set('Authorization', 'Bearer ' + await AuthService.createUserToken())
      .expect(200)
      .then(response => {
        assert.equal(response.body.article._id, idToSecretArticle)
      })
  })

  it('should not send secret article to non-user', async () => {
    await request(app)
      .get('/article/secret?id=' + idToSecretArticle)
      .expect(401)
  })

  it('should return 404 if article don\'t exist', async () => {
    await request(app)
      .get('/article/non-secret?id=5fcb8f0050e64ee050fcc953')
      .expect(404)
  })
})

describe('Writers', () => {
  it('should get available writers', async () => {
    await request(app)
      .get('/writers')
      .expect(200)
      .then(response => {
        assert.equal(response.body.Writers.length, 3)
      })
  })
})
