const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  _id: {
    type: String
  }
});

UserSchema.methods.comparePassword = (password, callback) => {
  return bcrypt.compare(password, this.password, callback)
  // what does this.password refer to???
}

// methods to implement
// UserSchema.methods.findByEmail = (email) => {
//
// }

// UserSchema.methods.changePassword = (email, password) => {
//
// }
// UserSchema.methods.findById = (id) => {
//
//}
// UserSchema.methods.generateHash = function(password) {
//
// }

// can just call .generateHash from UserSchema.preSave-**maybe not, wouldn't be a pure function (side-effects)
UserSchema.pre('save', (next) => {
  const user = this
  console.log('user', user)
  // if (!user.isModified('password')) { return next(); }
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    console.log('salt is', salt)
    return bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      console.log('has', hash)
      user.password = hash;
      return next();
    });
  });
});

module.exports =  mongoose.model('User', UserSchema);
