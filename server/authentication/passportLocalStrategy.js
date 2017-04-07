const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    User.findOne({ email: email}, (err, user) => {
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
));

// can I use function composition for this??
