require('dotenv').config();
require('./server/models').connect(process.env.DATABASE_URL);

const path = require('path'),
      https = require('https'),
      express = require('express'),
      fs = require('fs'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      MongoStore = require('connect-mongo')(express),
      passport = require('passport'),
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

// Session middleware (needs to be before passport initialization)
app.use(session({
  store: new MongoStore({
    mongooseConnection: // needs a session passed in
    ttl:  (1 * 60 * 60)
  }),
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


// Start HTTPS server
https.createServer(tlsOptions, app).listen(process.env.PORT,() => {
  console.log(`Secure Server on ${process.env.PORT}`);
});

// TODO: need to import sessionManagementConfig and pass in the app
// TODO: passport.serializeUser()
// TODO: passport.deserializeUser()
