const express = require('express')
const router = express.Router();
const ArticleController = require('../controllers/article.controller')
const secret = process.env.JWT_SECRET
const jwt = require('express-jwt')
const MW = require('./middleware')

router.get('/', MW.csrfProtection, ArticleController.getNonSecretArticles)
router.get('/non-secret', MW.csrfProtection, ArticleController.getNonSecretArticles)
router.get('/secret',
  jwt({ secret, algorithms: ['HS256']}),
  function(req, res) {
    if (req.user.userType === 1 || req.user.userType === 0){
      return ArticleController.getAllArticles(req, res)
    } else {
      return res.sendStatus(401)
    }
  })

module.exports = router
