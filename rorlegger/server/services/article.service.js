var Article = require('../models/article.model')
var Writer = require('../models/writer.model')
var WriterService = require('../services/writer.service')
const CategoryService = require("../services/category.service.js");


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


exports.createArticle = async function (data) {
  let body = data.body
  try {
    if (WriterService.writerExists(body.Writer.GivenName, body.Writer.FamilyName)){
      return await Article.create({
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
