require('dotenv').config();
const path = require('path'),
      https = require('https'),
      express = require('express'),
      fs = require('fs'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      session = require('express-session'),
      app = express(),
      ONE_YEAR = 31536000000;


// HSTS for Perfect Forward Secrecy
app.use(helmet.hsts({
  maxAge: ONE_YEAR,
  preload: true,
  force: true
}));

// logging middleware
app.use(logger('dev'));

// tls options for https server
const tlsOptions = {
        key: fs.readFileSync(`${process.env.KEY_PATH}`),
        ca: fs.readFileSync(`${process.env.CA_PATH}`),
        cert: fs.readFileSync(`${process.env.CERT_PATH}`),
};

// uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);

// use body-parser to
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: process.env.COOKIE_AGE
  }
}));

// Send static files
app.use(express.static(path.join(__dirname, 'dist')));

// 'get /' send the index.html with bundle
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server
https.createServer(tlsOptions, app).listen(process.env.PORT, () => {
  console.log(`Secure Server on ${process.env.PORT}`);
});
