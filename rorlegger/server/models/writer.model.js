var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const WriterSchema = new mongoose.Schema({
  GivenName: {type: String, required: true},
  FamilyName: {type: String, required: true}
})

const Writer = mongoose.model('Writer', WriterSchema)

module.exports = Writer
