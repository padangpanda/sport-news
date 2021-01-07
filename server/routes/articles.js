const router = require('express').Router()
const ApiController = require('../controllers/ApiController')

router.get('/', ApiController.getNewsApiSport)

module.exports = router