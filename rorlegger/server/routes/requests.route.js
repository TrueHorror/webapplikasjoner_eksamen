const express = require('express')
const router = express.Router();
const RequestController = require('../controllers/requests.controller')

router.post('/', RequestController.createRequest)

module.exports = router;
