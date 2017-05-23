const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    lowercase: true,
    required: false
  },
  lastname: {
    type: String,
    lowercase: true,
    required: false
  },
  password: {
    type: String,
    required: true
  }
})


module.exports =  mongoose.model('User', UserSchema)
