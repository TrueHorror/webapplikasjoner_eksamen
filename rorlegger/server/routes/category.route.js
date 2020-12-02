const express = require('express')
const router = express.Router();

var CategoryController = require('../controllers/category.controller')

router.post('/', CategoryController.createCategory)
router.get('/', CategoryController.getCategories)

module.exports = router
