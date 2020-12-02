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
  try {
    if (WriterService.writerExists(data.Writer.GivenName, data.Writer.FamilyName)){
      return await Article.create({
        Title: data.Title,
        Content: data.Content,
        Category: data.Category,
        Writer: {
          GivenName: data.Writer.GivenName,
          FamilyName: data.Writer.FamilyName
        },
      })
    } else {
      throw Error('Writer not found')
    }
  } catch (e) {
    console.error(e)
    throw Error('Could not create article')
  }
}
