require('dotenv').config();

const path = require('path'),
      fs = require('fs'),
      https = require('https'),
      mongooseConnection = require('./server/models/index').connect(process.env.DATABASE_URL),
      User = require('mongoose').model('User'),
      express = require('express'),
      session = require('express-session'),
      passport = require('passport'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      app = express(),
      authentication = require('./server/authentication/index'),
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
// or for mongostore: dbPromise: mongoosePromise (bluebird)
app.use(session({
  name: 'id',
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
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



// TODO: passport.serializeUser() passport.deserializeUser()
// TODO: handle api routes here

// authentication
app.use('/api', authentication);

// app.use('/api', authRouter);
// app.use('/api', mainRouter)




// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);


// Start HTTPS server
https.createServer(tlsOptions, app).listen(process.env.PORT,() => {
  console.log(`Secure Server on ${process.env.PORT}`);
});

// TODO: should have a passport configuration file that tells which strategies to use?
