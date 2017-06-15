// if cookie.id exists, look up to see if a user has that id.
// if it does, next()
// if it doesn't reject request.
// NOTE: all other requests.should check req.session.uid exists, if it does
// in order for this to happen, I need to search the session collection...

const User = require('../models/user')

function authenticate(req, res, next) {
  // console.log('req.session.id', req.session.id)
  // console.log('req.headers.cookie', req.headers.cookie)
  const nonRestrictedRoutes = ['/login', '/register', '/logout']
  const adminRoutes = ['/products', '/users']

  if (nonRestrictedRoutes.includes(req.path)) { return next() }

  if (adminRoutes.includes(req.path)) {
    console.log('req.path', req.path)
    console.log('req.session.id', req.session.id)
  }

  const sessionId = req.session.id
  // console.log('sessionId', sessionId)
  User.findOne({ sessionId }, (err, user) => {
    if (err || !user) {
      console.log('error or user doesnt exist with that sessionid')
      res.status(401).end()
    } else {
      console.log('user with session id', user)
      next()
    }

  })

  // next()
}

module.exports = authenticate
