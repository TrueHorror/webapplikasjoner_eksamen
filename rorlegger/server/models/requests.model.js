const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
  GivenName: {type: String, required: false},
  FamilyName: {type: String, required: false},
  Email: {type: String, required: true},
  Message: {type: String, required: true}
})

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request
