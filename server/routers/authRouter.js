const User = require('../models/user')
const authRouter = require('express').Router()
const passport = require('passport')

// REGISTRATION
authRouter.post('/register', (req, res, next) => {
  console.log(`registering user`)
  User.register(new User({
    username: req.body.email}),
    req.body.password,
    (err) => {
      if (err) {
        return next(err)
      }
      // log user in
      passport.authenticate('local')(req, res, () => {
        res.send('registered & logged in!')
      })
    }
  )
})

// LOGIN AUTHENTICATION
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(`req.user${req.user}`)
  res.send(`login successfull!`)
})

module.exports = authRouter
