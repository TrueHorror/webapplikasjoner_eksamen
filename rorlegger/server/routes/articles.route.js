const express = require('express')
const router = express.Router();
const ArticleController = require('../controllers/article.controller')
const secret = process.env.JWT_SECRET
const jwt = require('express-jwt')
const MW = require('./middleware')

router.get('/', ArticleController.getNonSecretArticles)
router.get('/non-secret', ArticleController.getNonSecretArticles)
router.get('/secret',
  jwt({ secret, algorithms: ['HS256']}),
  function(req, res) {
      return ArticleController.getAllArticles(req, res)
  })

module.exports = router
