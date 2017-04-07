const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
      User = require('mongoose').model('User');

module.exports = new LocalStrategy({
  usernameField: 'email',
  password: 'password',
  session: true,
  passReqToCallback: true
}, (email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    }

    return User.findOne({ email: userData.email }, (err, user) => {
      if (err) { return done(err); }
      if(!user) {
        return done(null, false, { message: 'Incorrect email' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }
);



// TODO: evaluate if session needs to be true
// TODO: if I'm sanitizing untrusted data before authentication, do I really need to trim()?

// IDEA: can I use function composition for this??
