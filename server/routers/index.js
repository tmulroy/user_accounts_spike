
const passport = require('passport')
const router = require('express').Router()
const authRouter = require('./authRouter')

router.post('/api', authRouter)

module.exports = router
