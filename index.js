require('dotenv').config();

const path = require('path'),
      fs = require('fs'),
      https = require('https'),
      mongoose = require('mongoose'),
      User = require('./server/models/user'),
      errorhandler = require('errorhandler'),
      express = require('express'),
      session = require('express-session'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      app = express(),
      indexRouter = require('./server/routers/index'),
      ONE_YEAR = 31536000000,
      tlsOptions = {
        key: fs.readFileSync(process.env.KEY_PATH),
        ca: fs.readFileSync(process.env.CA_PATH),
        cert: fs.readFileSync(process.env.CERT_PATH),
      };

// Mongoose connection
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))
db.once('open', () => {
  console.log('connection ok')
})

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

// development error middleware
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

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

// passport.use(new LocalStrategy({
//   usernameField: 'email'
//   },
//   (email, password, next) => {
//   console.log('inside passport localstrategy ')
//   console.log(`email to register: ${email}`)
//   console.log(`password to register: ${password}`)
//
//   const userData = {
//     email: email.trim(),
//     password: password.trim(),
//   }
//
//   User.findOne({ 'email': 'thomasjohnmulroy@gmail.com'},
//     (err, user) => {
//
//       if (err) return next(err)
//       if (!user) {
//
//         const newUser = new User(userData)
//         newUser.save((err, newUser) => {
//           if (err) return console.error(err)
//           next(user)
//         })
//
//       }
//
//     })
//
// }))

passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




// app.post('/api/register',
//   passport.authenticate('local', { failWithError: true }),
//   (req, res) => {
//     console.log(`authenticate req ${req}`)
//     console.log(`res ${res}`)
//   }
// )

// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);

// Start HTTPS server
const httpsServer = https.createServer(tlsOptions, app).listen(process.env.PORT,() => {
  console.log(`Secure Server on ${process.env.PORT}`);
});

// TODO: should have a passport configuration file that tells which strategies to use?
