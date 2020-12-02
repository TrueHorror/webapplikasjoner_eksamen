const express = require('express')
const router = express.Router();

var UserController = require('../controllers/user.controller')

router.post('/', UserController.createUser);
router.put('/', UserController.loginUser);

module.exports = router
