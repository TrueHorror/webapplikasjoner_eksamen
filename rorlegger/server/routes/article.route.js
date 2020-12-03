const express = require('express')
const router = express.Router();

var ArticleController = require('../controllers/article.controller')

router.post('/', ArticleController.createArticle)
//router.get('/', ArticleController.getArticles)
//router.get('/:articleId', ArticleController.getArticle)
//router.delete('/:articleId', ArticleController.deleteArticle)
//router.patch('/:articleId', ArticleController.updateArticle)

module.exports = router;