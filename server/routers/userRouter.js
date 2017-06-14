const userRouter = require('express').Router()

userRouter.get('/:id', UserController.findOne)
