'use strict'

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      localLoginStrategy = require('../authentication/local-login'),
      localSignUpStrategy = require('../authentication/local-signup');

// router.post('/login', passport.authenticate('local-login'), (req, res) => {
//   // should call serializeUser && deserializeUser here,
//   // if this function gets called, local-login was successful
//   // user is stored at req.user
//   // res.redirect('/:id/dashboard')
// })

  router.post('/register', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      console.log('inside local strategy')
      if (err) { return next(err) }
    })
  })

// router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
//   console.log('register successful')
//
// })

module.exports = router;
