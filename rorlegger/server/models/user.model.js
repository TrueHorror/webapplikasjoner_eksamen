var mongoose = require('mongoose')
var Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  GivenName: {type: String, required: true},
  FamilyName: {type: String, required: true},
  UserType: {type: Number, required: true},
  Email: {type: String, unique: true, required: true},
  Password: {type: String, required: true}
})

const User = mongoose.model('User', UserSchema)

module.exports = User
