var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
  Name: {type: String, required: true}
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
