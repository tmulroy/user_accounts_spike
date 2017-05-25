require('dotenv').config();

const path = require('path'),
      fs = require('fs'),
      https = require('https'),
      crypto = require('crypto'),
      uuid = require('node-uuid'),
      mongoose = require('mongoose'),
      User = require('./server/models/user'),
      errorhandler = require('errorhandler'),
      express = require('express'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      app = express(),
      indexRouter = require('./server/routers/routes'),
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

// development-only middleware
if (process.env.NODE_ENV === 'development') {
  // error handler middleware
  app.use(errorhandler())
  // logging middleware
  app.use(logger('dev'));
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

// or for mongostore: dbPromise: mongoosePromise (bluebird)
app.use(session({
  name: 'uid',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // genid: (req) => {return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex")},
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1800000
  }
}));


// handle requests with index router
app.use('/api', indexRouter)

// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);

// Start HTTPS server
const httpsServer = https.createServer(tlsOptions, app).listen(process.env.PORT,() => {
  console.log(`Secure Server on ${process.env.PORT}`);
});
