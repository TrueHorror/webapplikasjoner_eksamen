var Article = require('../models/article.model')
var Writer = require('../models/writer.model')
var WriterService = require('../services/writer.service')


exports.getArticles = async function (){
  try {
    return await Article.find()
  } catch (e) {
    console.error(e)
    throw Error('Could not find any articles')
  }
}


exports.createArticle = async function (data) {
  let body = data.body
  try {
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
