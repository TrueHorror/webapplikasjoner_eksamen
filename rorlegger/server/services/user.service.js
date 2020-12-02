var User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const saltRounds = 10;

exports.createUser = async function (data) {
  try {
    let userType = exports.getUserType(data.UserType)

    bcrypt.genSalt(saltRounds, async function(err, salt) {
      bcrypt.hash(data.Password, salt, async function(err, hash) {
        return await User.create({
          GivenName: data.GivenName,
          FamilyName: data.FamilyName,
          UserType: userType,
          Email: data.Email,
          Password: hash
        })
      });
    });
  } catch (e) {
    console.error(e)
    throw Error('Could not create user')
  }
}

exports.loginUser = async function (data) {
  try {
    let dataFromDb = await User.findOne({Email: data.Email})
    if (await bcrypt.compare(data.Password, dataFromDb.Password)){
      return {
        GivenName: dataFromDb.GivenName,
        FamilyName: dataFromDb.FamilyName,
        Email: dataFromDb.Email,
        UserType: dataFromDb.UserType
      }
    } else {
      return null
    }
  } catch (e) {
    console.error(e)
    throw Error('Login failed')
  }
}

exports.getUserType = function (userType){
  if (userType === 'admin' || userType === 'administrator' || userType === '0'){
    return 0
  }
}

