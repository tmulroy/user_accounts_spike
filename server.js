require('dotenv').config();
require('./server/models').connect(process.env.DATABASE_URL);

const path = require('path'),
      https = require('https'),
      express = require('express'),
      fs = require('fs'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      passport = require('passport'),
      mongoStoreFactory = require('connect-mongo'),
      localLoginStrategy = require('./server/authentication/local-login'),
      localSignUpStrategy = require('./server/authentication/local-signup'),
      session = require('express-session'),
      app = express(),
      ONE_YEAR = 31536000000,
      tlsOptions = {
        key: fs.readFileSync(process.env.KEY_PATH),
        ca: fs.readFileSync(process.env.CA_PATH),
        cert: fs.readFileSync(process.env.CERT_PATH),
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


// Send static files
app.use(express.static(path.join(__dirname, 'dist')));

// send front end application...
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// use body-parser for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(session({
  name: 'id',
  saveUninitialized: true,
  resave: false,
  secret: process.env.SECRET,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1800000
  }
}));

// passport middleware initialization
app.use(passport.initialize());

// tell passport to use sessions
app.use(passport.session());

// tell passport to use the local authentication strategies
passport.use('local-signup', localSignUpStrategy);
passport.use('local-login', localLoginStrategy);



// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);
app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  passport.authenticate('local',
    {
      failureRedirect: '/login'
    }),
  (req,res) => {
    res.redirect(`/users/${req.user.username}`)
  }
  });

// Start HTTPS server
https.createServer(tlsOptions, app).listen(process.env.PORT,() => {
  console.log(`Secure Server on ${process.env.PORT}`);
});

// TODO: passport.serializeUser()
// TODO: passport.deserializeUser()
// IDEA: store: sessinoStore (could be separate file representing mongo session store)
