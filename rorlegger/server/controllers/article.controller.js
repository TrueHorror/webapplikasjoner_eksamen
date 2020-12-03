
const ArticleService = require('../services/article.service')

exports.createArticle = async function (req, res, next) {
  try {
    await ArticleService.createArticle(req)
    return res.status(201).json({message: "Successfully created an article"});
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.getArticles = async function (req, res, next) {
  try {
    let articles = await ArticleService.getArticles()
    return res.status(200).json({message: "Successfully retrieved articles", articles})
  } catch (e) {
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
