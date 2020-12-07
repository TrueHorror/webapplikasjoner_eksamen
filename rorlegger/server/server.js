const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const hpp = require('hpp');
const csrf = require('csurf')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

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
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }));
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
