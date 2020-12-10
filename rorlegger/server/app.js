const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const hpp = require('hpp');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");

require('dotenv').config({path: __dirname + '/.env'})

const app = express()

if (process.env.NODE_ENV === 'test'){
  initServer(app)
} else {
  mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      bufferCommands: false
    })
    .then(() => {
      initServer(app)
    })
    .catch((e) => {console.error(e)})
}

function initServer(app){
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(mongoSanitize());
  app.use(cookieParser())
  app.use(hpp())
  app.use(express.json())
  app.use(cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  }))
  app.use('/articles', require('./routes/articles.route.js'))
  app.use('/article/img', require('./routes/articleImages.route'))
  app.use('/article', require('./routes/article.route.js'))
  app.use('/writers', require('./routes/writer.route.js'))
  app.use('/category', require('./routes/category.route'))
  app.use('/user', require('./routes/user.route'))
  app.use('/request', require('./routes/requests.route'))
  app.use('/tracking', require('./routes/tracking.route'))
}





module.exports = app
