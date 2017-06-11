const bcrypt = require('bcrypt');
const User = require('../models/user')
const crypto = require('crypto')
const uuid = require('node-uuid')
const saltRounds = 10

class AuthController {
  static login(req, res) {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        res.status(401).end()
      } else {
        const hash = user.password
        bcrypt.compare(req.body.password, hash, (err, validPassword) => {
          if (err || !validPassword) {
            res.status(401).end()
          } else {
            let newSessionID = crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex")
            res.cookie('id', newSessionID, {
              secure: true,
              httpOnly: true,
              maxAge: 1800000
            })
            user.sessionId = newSessionID
            user.save()
            res.status(200).end()
          }
        })
      }
    })
  }

  static register(req, res) {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(401).end()
      }
      if (user) {
        res.status(401).end()
      }
      if (!user) {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            console.log(`register hash error: ${err}`)
            res.status(401).end()
          } else {
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
            res.status(200).end()
          }
        })
      }
    })
  }
}

module.exports = AuthController
