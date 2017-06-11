const authRouter = require('express').Router()
const AuthController = require('../controllers/AuthController')

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)

module.exports = authRouter
