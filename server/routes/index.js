const router = require('express').Router()
const authRouter = require('./auth')
const newsRouter = require('./articles')
const { authenticate } = require('../middlewares/checkToken')

router.use(authRouter)

router.use(authenticate)
router.use('/news', newsRouter)

module.exports = router