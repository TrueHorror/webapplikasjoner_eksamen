const express = require('express')
const router = express.Router();

var ArticleController = require('../controllers/article.controller')

router.get('/', ArticleController.getArticles)

module.exports = router
