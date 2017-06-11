require('dotenv').config();
const path = require('path'),
      fs = require('fs'),
      https = require('https'),
      crypto = require('crypto'),
      uuid = require('node-uuid'),
      db = require('./server/config/db'),
      User = require('./server/models/user'),
      errorhandler = require('errorhandler'),
      express = require('express'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      app = express(),
      authRouter = require('./server/routers/authRouter'),
      authentication = require('./server/middleware/authentication'),
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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// or for mongostore: dbPromise: mongoosePromise (bluebird)
app.use(session({
  name: 'id',
  store: new MongoStore({ mongooseConnection: db }),
  genid: (req) => {return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex")},
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1800000
  }
}));

app.use('/api', authentication)
app.use('/api', authRouter)

// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);

// Start HTTPS server
const httpsServer = https.createServer(tlsOptions, app).listen(process.env.PORT,() => {
  console.log(`Secure Server on ${process.env.PORT}`);
});
