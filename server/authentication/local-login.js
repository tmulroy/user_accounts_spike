const passport = require('passport'),
      User = require('mongoose').model('User');
      LocalStrategy = require('passport-local').Strategy;

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

      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }

      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (passwordErr) { return done(passwordErr) };

        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';
          return done(error);
        }
        const payload = {
          sub: user._id
        };
        // handle tokenization here if necessary
        // need to return done with user
      });
    });
  });



// TODO: evaluate if session needs to be true
// TODO: if I'm sanitizing untrusted data before authentication, do I really need to trim()?

// IDEA: can I use function composition for this??
