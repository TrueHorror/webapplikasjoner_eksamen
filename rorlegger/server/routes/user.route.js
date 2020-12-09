const express = require('express')
const router = express.Router();
const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET

var UserController = require('../controllers/user.controller')

router.post('/', UserController.createUser);
router.put('/', UserController.loginUser);
router.patch('/',
  jwt({ secret, algorithms: ['HS256'] }),
  (req, res) => {
    if (req.user.userType === 0) {
      return UserController.changeUserPrivileges(req, res);
    } else {
      return res.sendStatus(401);
    }
});


module.exports = router
