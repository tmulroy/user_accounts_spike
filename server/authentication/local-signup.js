const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('mongoose').model('User');

// Return the passport Local Strategy Object

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: true
}, (email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    const newUser = new User(userData);
    newUser.save((err) => {
      if (err) { return done(err) };
      return done(null)
    });
  }
);

// TODO: am I returning anything here?
// TODO: add automatic login after registration.
