
const router = require('express').Router()
const User = require('../models/user')

// REGISTRATION
router.post('/register', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return next()
    if (user) return res.json({text: 'user already registered with that email'})
    if (!user) {
      const userData = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }
      const newUser = new User(userData)
      req.session.user = newUser.id
      res.json(req.session)
      // console.log(`userData: ${userData}`)
    }
  })
  // should generate new user and then link req.sessionID to newUser.id in new mongo collection
  //User findbyEmail
  // if error, return error
  // else create new User
  // log user in
})

// LOGIN AUTHENTICATION
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.send(`login successfull!`)
// })

// router.get('/users/:userid', auth, )

module.exports = router
