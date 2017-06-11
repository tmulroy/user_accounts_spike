// if cookie.id exists, look up to see if a user has that id.
// if it does, next()
// if it doesn't reject request.
const User = require('../models/user')

function authenticate(req, res, next) {

  const nonRestrictedRoutes = ['/login', '/register', '/logout']

  if (nonRestrictedRoutes.includes(req.path)) { return next() }

  const sessionId = req.session.id
  console.log('sessionId', sessionId)
  User.findOne({ sessionId }, (err, user) => {
    if (err || !user) {
      console.log('error or user doesnt exist with that sessionid')
      res.status(401).end()
    } else {
      console.log('user with session id', user)
    }

  })

  // next()
}

module.exports = authenticate
