
const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// REGISTRATION
router.post('/register', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return next()
    if (user) return res.send({status: 403})
    if (!user) {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          console.log(`hash error: ${err}`)
        }
        const newUser = new User({
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        })

        // fb3d5bef792b40d9681c32dce0541a92393c96ee98c90c1c4db69734c49f1739
        // fb3d5bef792b40d9681c32dce0541a92393c96ee98c90c1c4db69734c49f1739
        // 59278c99a1801a6f2a11751a
        // 59278c99a1801a6f2a11751a
        // browser cookie

        // res.cookie()
        newUser.save()
        console.log(`req.session.id ${req.session.id}`)
        console.log(`new user id ${newUser._id}`)
        res.end()
        // res.json({text: 'user registered'})
      })

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
