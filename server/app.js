const express = require('express')
const router = require('./routes')
const app = express()
const port = 3080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(port, () => console.log('listen on port,', port))