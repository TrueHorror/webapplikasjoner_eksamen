var UserService = require('../services/user.service')

exports.createUser = async function (req, res, next) {
  try {
    await UserService.createUser(req.body)
    return res.status(201).json({message: "User created"})
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.loginUser = async function (req, res, next) {
  try {
    let userData = await UserService.loginUser(req.body)
    if (userData){
      return res.status(200).json({Token: userData, message: "User logged in"})
    } else {
      return res.status(401).json({message: "Wrong email/password"})
    }
  } catch (e) {
    console.error(e)
    return res.status(401).json({message: e.message})
  }
}
