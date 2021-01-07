const express = require('express')
const router = require('./routes')
const app = express()
const port = 3080
const ApiController = require('./controllers/ApiController')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', ApiController.getNewsApiSport)

app.listen(port, () => console.log('listen on port,', port))