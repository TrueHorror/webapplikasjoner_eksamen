var Article = require('../models/article.model')
var Writer = require('../models/writer.model')
var WriterService = require('../services/writer.service')
const CategoryService = require("../services/category.service.js");


exports.getArticles = async function (){
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


exports.createArticle = async function (data) {
  let body = data.body
  try {
    console.log(data)
    //TODO Test this (admin access only)
    if (data.user.userType !== 0){
      throw 'Only admins can create articles'
    }
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
        Created: new Date()
      })
    } else {
      throw Error('Writer not found')
    }
  } catch (e) {
    console.error(e)
    throw Error('Could not create article')
  }
}
