const express = require('express')
const router = express.Router();
const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET

const TrackingController = require('../controllers/tracking.controller')

router.post('/',
  jwt({ secret, algorithms: ['HS256'] }),
  (req, res) => {
    return TrackingController.createNewEntry(req, res)
  }
);

router.get('/articles/views',
  jwt({ secret, algorithms: ['HS256'] }),
  (req, res) => {
    return TrackingController.getViewsForAllArticles(req, res)
  }
  )

module.exports = router

