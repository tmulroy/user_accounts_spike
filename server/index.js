const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60000
  }
}));
