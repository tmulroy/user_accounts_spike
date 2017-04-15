const passport = require('passport'),
      localLoginStrategy = require('./local-login'),
      localSignUpStrategy = require('./local-signup');

// need a router here
// tell passport to use the local authentication strategies based on route
// need to take in an app or a session?
module.exports = () => {
  passport.use('local-login', localLoginStrategy);
  passport.use('local-signup', localSignUpStrategy);
}
