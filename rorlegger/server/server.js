const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('express-jwt')

require('dotenv').config({path: __dirname + '/.env'})
const secret = process.env.JWT_SECRET

mongoose
	.connect("mongodb://localhost:27017/articles", { useNewUrlParser: true })
	.then(() => {
		const app = createServer()
		app.listen(3001, () => {
			console.log("Server has started!")
		})
  })
  

function createServer(){
  const app = express()
  app.use(express.json())
  app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }))

  app.use(jwt({secret, algorithms: ['HS256'] }).unless({path: ['/user', '/articles']}));

  app.use('/articles', require('./routes/articles.route.js'))
  app.use('/article', require('./routes/article.route.js'))
  app.use('/writers', require('./routes/writer.route.js'))
  app.use('/category', require('./routes/category.route'))
  app.use('/user', require('./routes/user.route'))
  return app
}
