
var ArticleService = require('../services/article.service')

exports.createArticle = async function (req, res, next) {
  try {
    await ArticleService.createArticle(req.body)
    return res.status(201).json({message: "Successfully created an article"});
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}



/*
router.post('/', ArticleController.createArticle)
router.get('/', ArticleController.getArticles)
router.get('/:articleId', ArticleController.getArticle)
router.delete('/:articleId', ArticleController.deleteArticle)
router.patch('/:articleId', ArticleController.updateArticle)
*/
