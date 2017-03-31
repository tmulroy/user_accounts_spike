const express = require('express'),
 bodyParser = require('body-parser'),
 logger = require('morgan'),
 passport = require('passport'),
 session = require('express-session');

require('dotenv').config();

const app = express();

// logging middleware
app.use(logger('dev'));


// Add middleware to parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60000
  }
}));

// Point to bundle
app.use(express.static('../dist/index.html'));

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
