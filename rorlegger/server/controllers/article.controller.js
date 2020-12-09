const ArticleService = require('../services/article.service')
const TrackingService = require('../services/tracking.service')

exports.createArticle = async function (req, res, next) {
  try {
    let dbRes = await ArticleService.createArticle(req)
    return res.status(201).json({message: "Successfully created an article", _id: dbRes._id});
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.addImageToArticle = async function (req, res, next) {
  try {
    await ArticleService.saveImageToArticle(req.query.articleId, req.file.id)
    return res.status(201).json({message: 'Image uploaded'})
  } catch (e) {
    return res.status(400).json({message: e.message})
  }
}

exports.getNonSecretArticles = async function (req, res, next) {
  try {
    let articles = await ArticleService.getNonSecretArticles()
    return res.status(200).json({message: "Successfully retrieved articles", articles})
  } catch (e) {
    return res.status(400).json({message: e.message})
  }
}

exports.getAllArticles = async function (req, res, next) {
  try {
    let articles = await ArticleService.getAllArticles()
    return res.status(200).json({message: "Successfully retrieved articles", articles})
  } catch (e) {
    return res.status(400).json({message: e.message})
  }
}

exports.getSecretArticle = async (req, res, next) => {
  try {
    let article = await ArticleService.getSecretArticle(req.query.id)
    await TrackingService.newEntry({
      type: 'article',
      id: req.query.id,
      userId: req.user.sub
    })
    if (!article){
      return res.status(404).json({message: "Article not found"})
    }
    return res.status(200).json({message: "Successfully retrieved article", article})
  } catch (e) {
    return res.status(404).json({message: "Could not find article"})
  }
}

exports.getNonSecretArticle = async (req, res, next) => {
  try {
    let article = await ArticleService.getNonSecretArticle(req.query.id)
    if (!article){
      return res.status(404).json({message: "Article not found"})
    }
    return res.status(200).json({message: "Successfully retrieved article", article})
  } catch (e) {
    return res.status(400).json({message: "Could not get article"})
  }
}

exports.getImageIdByArticleId = async function (req, res, next) {
  try {
    return await ArticleService.getImageIdByArticleId(req.query.articleId)
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
