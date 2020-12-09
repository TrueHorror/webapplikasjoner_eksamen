var User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const nJwt = require('njwt')
const saltRounds = 10;

exports.createUser = async function (data) {
  try {
    bcrypt.genSalt(saltRounds, async function(err, salt) {
      bcrypt.hash(data.Password, salt, async function(err, hash) {
        let res = await User.create({
          GivenName: data.GivenName,
          FamilyName: data.FamilyName,
          UserType: 1,
          Email: data.Email,
          Password: hash
        })
        return res
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

      return createToken(dataFromDb)
    } else {
      return null
    }
  } catch (e) {
    throw Error('Login failed')
  }
}

createToken = function (data){
  let claims = {
    sub: data._id,
    givenName: data.GivenName,
    familyName: data.FamilyName,
    email: data.Email,
    userType: data.UserType
  }
  let token = nJwt.create(claims,process.env.JWT_SECRET);
  token.setExpiration(new Date().getTime() + 60*60*1000)
  return token.compact()
}

exports.getUserType = function (userType){
  if (userType === 'admin' || userType === 'administrator' || userType === '0'){
    return 0
  }
}

exports.changeUserPrivileges = async (data) => {
  let newPrivilege = data.UserType;
  let userId = data.UserId;
  return User.findByIdAndUpdate(userId, {
    UserType: newPrivilege
  })
}

