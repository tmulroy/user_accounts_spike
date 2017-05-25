
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
        // s%3AefNNtCpEylw2SprD7fnOGZeEfvXgLjeZ.IbpFJ11b29Vg7w3iDfZxh259fYRxVbazBJe3JVa1grY
        // s%3A_ZAgWcYVx0IyY_yeTaOXcu1C30QN4EOG.ZNx0QYFQORKJU7cPD9s9d3Yb0HuBzWoSHEzGtPdmAso
        // s%3A-n27Y4NANaOvD0XYSIlv_ygXpHFx0L68.gn%2FBVqC2RHSy57bBR2rkt4Yt%2FX8CKaf5jQ9YftHVp4s
        req.session.username = newUser.email
        newUser.save()
        console.log(`req.session.id ${req.session.id}`)
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
