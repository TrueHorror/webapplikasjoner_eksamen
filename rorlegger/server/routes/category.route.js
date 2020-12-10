const express = require('express')
const router = express.Router();
const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET

var CategoryController = require('../controllers/category.controller')

router.post('/',
  jwt({ secret, algorithms: ['HS256'] }),
  (req, res) => {
    return CategoryController.createCategory(req, res)
  })

router.get('/', CategoryController.getCategories)

module.exports = router
