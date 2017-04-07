require('dotenv').config();
const path = require('path'),
      https = require('https'),
      express = require('express'),
      fs = require('fs'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      passport = require('passport'),
      localLoginStrategy = require('./server/authentication/local-login'),
      localSignUpStrategy = require('./server/authentication/local-signup'),
      session = require('express-session'),
      app = express(),
      ONE_YEAR = 31536000000,
      tlsOptions = {
        key: fs.readFileSync(`${process.env.KEY_PATH}`),
        ca: fs.readFileSync(`${process.env.CA_PATH}`),
        cert: fs.readFileSync(`${process.env.CERT_PATH}`),
      };


// HSTS for Perfect Forward Secrecy
app.use(helmet.hsts({
  maxAge: ONE_YEAR,
  preload: true,
  force: true
}));

// Remove revealing info on header
app.disable('x-powered-by');

// logging middleware
app.use(logger('dev'));

// use body-parser for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport middleware initialization
app.use(passport.initialize());

// tell passport to use the local authentication strategies
passport.use('local-signup', localSignUpStrategy);
passport.use('local-login', localLoginStrategy);

// Session middleware
app.use(session({
  name: 'id',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1800000
  }
}));

// Send static files
app.use(express.static(path.join(__dirname, 'dist')));

// send front end application...
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);
app.post('/login',
  passport.authenticate('local',
    {
      failureRedirect: '/login'
    }),
  (req,res) => {
    res.redirect(`/users/${req.user.username}`)
  });

// Start HTTPS server
https.createServer(tlsOptions, app).listen(process.env.PORT, () => {
  console.log(`Secure Server on ${process.env.PORT}`);
});
