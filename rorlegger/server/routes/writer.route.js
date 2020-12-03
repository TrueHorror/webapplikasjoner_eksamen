const express = require('express')
const router = express.Router();

var WriterController = require('../controllers/writer.controller')

router.get('/', WriterController.getWriters)

module.exports = router
