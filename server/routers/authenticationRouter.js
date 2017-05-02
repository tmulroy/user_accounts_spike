const express = require('express'),
      router = express.Router(),
      passport = require('passport');
      localLoginStrategy = require('../authentication/local-login'),
      localSignUpStrategy = require('../authentication/local-signup');

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  // should serialize and deserializeUser here or in local strategies?
})

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  
})

module.exports = router;
