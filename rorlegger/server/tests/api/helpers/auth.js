const nJwt = require('njwt')

exports.createAdminToken = function (data = {
  _id: '5fcb8f0050e64ee050fcc953',
  GivenName: 'Hans',
  FamilyName: 'Hansen',
  Email: 'hans@gmail.com',
  UserType: 0
}){
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

exports.createUserToken = function (data = {
  _id: '5fcb8f0050e64ee050fcc953',
  GivenName: 'Kari',
  FamilyName: 'Jakkeson',
  Email: 'kari@gmail.com',
  UserType: 1
}){
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

