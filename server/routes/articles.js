const router = require('express').Router()
const ApiController = require('../controllers/ApiController')

router.post('/', ApiController.getNewsApiSport)

module.exports = router