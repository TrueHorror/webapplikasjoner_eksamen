const Article = require('../models/article.model')
const WriterService = require('../services/writer.service')
const ObjectID = require('mongoose').ObjectID;


exports.getAllArticles = async function (){
  try {
    return await Article.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'Category',
          foreignField: '_id',
          as: 'Category'
        },
      },
      {
        $addFields: {
          Category: {
            $arrayElemAt: ['$Category', 0]
          }
        }
      }
    ])
  } catch (e) {
    console.error(e)
    throw Error('Could not find any articles')
  }
}

exports.getNonSecretArticles = async function (){
  try {
    return await Article.aggregate([
      { $match: {'Secret': false}},
      {
        $lookup: {
          from: 'categories',
          localField: 'Category',
          foreignField: '_id',
          as: 'Category'
        },
      },
      {
        $addFields: {
          Category: {
            $arrayElemAt: ['$Category', 0]
          }
        }
      }
    ])
  } catch (e) {
    console.error(e)
    throw Error('Could not find any articles')
  }
}

exports.getNonSecretArticle = async (id) => {
  try {
    let article = await Article.findOne({
      _id: id,
      Secret: false
    })
    if (!article){
      return article
    } else {
      return addReadTime(article)
    }
  } catch (e) {
    console.error(e)
    throw Error('Article not found')
  }
}

exports.getSecretArticle = async (id) => {
  try {
    let article = await Article.findOne({'_id': id})
    if (!article){
      return article
    } else {
      return addReadTime(article)
    }
  } catch (e) {
    console.error(e)
    throw Error('Article not found')
  }
}


exports.createArticle = async function (data) {
  let body = data.body
  try {
    if (WriterService.writerExists(body.Writer.GivenName, body.Writer.FamilyName)){
      return Article.create({
        Title: body.Title,
        Ingress: body.Ingress,
        Content: body.Content,
        SubHeader: body.SubHeader,
        Category: body.Category,
        Writer: {
          GivenName: body.Writer.GivenName,
          FamilyName: body.Writer.FamilyName
        },
        User: data.user.sub,
        Created: new Date(),
        Secret: body.Secret
      })
    } else {
      throw Error('Writer not found')
    }
  } catch (e) {
    console.error(e)
    throw Error('Could not create article')
  }
}

exports.saveImageToArticle = async function (articleId, imageId) {
  try {
    return Article.findByIdAndUpdate(
      {
        _id: articleId
      },
      {
        Image: imageId
      }
    )
  } catch (e) {
    throw Error('Couldn\'t save image');
  }
}

exports.getImageIdByArticleId = async function (articleId) {
  try {
    let article = await Article.findOne({_id: articleId})
    return article.Image;
  } catch (e) {
    throw Error('Could not get imageId')
  }
}

const addReadTime = (article) => {
  let readTime = article.Content.split(' ').length/ 200
  if (readTime <= 1){
    readTime = 1
  } else {
    readTime = Math.floor(readTime)
  }
  let convertedToJson = article.toObject()
  convertedToJson.ReadTime = readTime
  return convertedToJson
}
