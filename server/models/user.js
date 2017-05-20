const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');
      passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  username: {
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
  }
})

UserSchema.plugin(passportLocalMongoose)

// password: {
//   type: String,
//   required: true
// },

module.exports =  mongoose.model('User', UserSchema)
