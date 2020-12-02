var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  Title: {type: String, required: true} ,
  Content: {type: String, required: false},
  Category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  Writer: {
    GivenName: {type: String, required: true},
    FamilyName: {type: String, required: true}
  },
  User: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
