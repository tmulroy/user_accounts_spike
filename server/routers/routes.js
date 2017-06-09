
const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10
const crypto = require('crypto')
const uuid = require('node-uuid')

// REGISTRATION
router.post('/register', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return next()
    if (user) return res.send({status: 403})
    if (!user) {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          console.log(`hash error: ${err}`)
          // res.json({error: 'error registering'})
        }
        const newUser = new User({
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          sessionId: req.session.id
        })
        res.cookie('id', crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex"), {
          secure: true,
          httpOnly: true,
          maxAge: 1800000
        })
        newUser.save()
        // should check for cookie, if none, then reset?
        res.json({text: 'registered'})
        next()
      })
    }
  })
})

// LOGIN
router.post('/login', (req, res, next) => {
  console.log('req.body', req.body)
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return next()
    if (!user) return res.json({text: 'user doesnt exist'})
    // need to compare passwordString
    console.log('user exists', user)
    let newSessionID = crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex")
    res.cookie('id', newSessionID, {
      secure: true,
      httpOnly: true,
      maxAge: 1800000
    })
    user.sessionId = newSessionID
    user.save()
    console.log('updated user', user)
    res.json({text: 'loggedin'})
    next()
  })
})


// router.get('/users/:userid', auth, )
// NOTE: should change login and register route to UserController methods
module.exports = router
