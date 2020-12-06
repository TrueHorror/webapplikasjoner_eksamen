const express = require('express')
const router = express.Router();
const ArticleController = require('../controllers/article.controller')
const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET



router.post('/',
  jwt({ secret, algorithms: ['HS256'] }),
  function(req, res) {
    if (req.user.userType !== 0){
      return res.sendStatus(401);
    } else {
      return ArticleController.createArticle(req, res);
    }
  })

module.exports = router;

