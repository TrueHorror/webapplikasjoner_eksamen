const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('express-jwt')

require('dotenv').config({path: __dirname + '/.env'})
const secret = process.env.JWT_SECRET

mongoose
	.connect("mongodb+srv://admin_user:QOnOBxLcEMfV0iNV@cluster0.ftgkp.mongodb.net/articles?retryWrites=true&w=majority", { useNewUrlParser: true })
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
  app.use('/articles', require('./routes/articles.route.js'))
  app.use('/article', require('./routes/article.route.js'))
  app.use('/writers', require('./routes/writer.route.js'))
  app.use('/category', require('./routes/category.route'))
  app.use('/user', require('./routes/user.route'))
  app.use('/request', require('./routes/requests.route'))
  return app
}
