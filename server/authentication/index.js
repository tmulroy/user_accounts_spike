const passport = require('passport'),
      localLoginStrategy = require('./local-login'),
      localSignUpStrategy = require('./local-signup'),

module.exports = () => {

  passport.use('local-login', localLoginStrategy);
  passport.use('local-signup', localSignUpStrategy);

  router.post('/login', passport.authenticate('local-login'), (req, res) => {
    // should serialize and deserializeUser here?
  })

}
