const app = require('./app')

app.listen(parseInt(process.env.PORT), () => {
  console.log("Server has started!")
})
