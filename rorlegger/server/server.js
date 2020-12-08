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

mongoose
	.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
	.then(() => {
		const app = createServer()
		app.listen(parseInt(process.env.PORT), () => {
			console.log("Server has started!")
		})
  })
  

function createServer(){

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  const app = express()
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
  return app
}
