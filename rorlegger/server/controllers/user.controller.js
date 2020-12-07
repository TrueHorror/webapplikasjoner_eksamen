var UserService = require('../services/user.service')

exports.createUser = async function (req, res, next) {
  const validation = validateUserCreation(req.body)
  if (validation){
    return res.status(400).json({message: validation})
  }
  try {
    await UserService.createUser(req.body)
    return res.status(201).json({message: "User created"})
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

const validateUserCreation = (data) => {
  let givenName = data.GivenName;
  let familyName = data.FamilyName;
  let email = data.Email;
  let password = data.Password;
  if (!givenName || !familyName || !email || !password) {
    return 'Required fields are blank';
  }
  if (password.length < 8) {
    return 'Password must be 8 characters!';
  }
  if (!/([0-9])/.test(password)) {
    return 'Password must consist of a number';
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return 'Email is not valid';
  }
  return '';
}

exports.loginUser = async function (req, res, next) {
  const validation = validateLogin(req.body);
  if (validation){
    return res.status(400).json({message: validation})
  }
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

const validateLogin = (data) => {
  let email = data.Email;
  let password = data.Password;
  if (!email || !password) {
    return 'Required fields are blank';
  }
  if (password.length < 8) {
    return 'Password must be 8 characters!';
  }
  if (!/([0-9])/.test(password)) {
    return 'Password must consist of a number';
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return 'Email is not valid';
  }
  return '';
}


