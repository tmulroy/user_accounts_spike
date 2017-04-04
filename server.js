const https = require('https'),
      express = require('express'),
      fs = require('fs'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      passport = require('passport'),
      session = require('express-session'),
      ONE_YEAR = 31536000000;

// Use dotenv to access .env file
require('dotenv').config();

const app = express();

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

// only uncomment when there's a HTTP server and a redirect to HTTPS server
// http.createServer(app).listen(80);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.SECRET,
//   cookie: {
//     maxAge: 60000
//   }
// }));

// Point to bundle
app.use(express.static('../dist/index.html'));

// Start server
https.createServer(tlsOptions, app).listen(443, () => {
  console.log(`Secure Server on 443`);
});

app.get('*', (req, res) => {
        res.status(200)
        res.send('hello world from secure server')
})
