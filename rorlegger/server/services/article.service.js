var Article = require('../models/article.model')
var Writer = require('../models/writer.model')
var WriterService = require('../services/writer.service')
const CategoryService = require("../services/category.service.js");


exports.getArticles = async function (){
  try {
    let articles = await Article.find()
    console.log(articles)
    let categories = await CategoryService.getCategories()
    console.log(categories)
    articles.forEach((article) => {
      let category = categories.find((oneCategory) => {
        console.log(oneCategory._id, article.Category)
        return oneCategory._id === article.Category
      })
      console.log(article)
      console.log(category)
      article.Category = category.Name
    })
    console.log(articles)
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
        Content: body.Content,
        Category: body.Category,
        Writer: {
          GivenName: body.Writer.GivenName,
          FamilyName: body.Writer.FamilyName
        },
        User: data.user.sub
      })
    } else {
      throw Error('Writer not found')
    }
  } catch (e) {
    console.error(e)
    throw Error('Could not create article')
  }
}
