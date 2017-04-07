const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

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
  {
    timestamps: true
  }
});

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback)
  // what does this.password refer to???
}

// UserSchema.methods.generateHash = function(password) {
//
// }

// can just call .generateHash from UserSchema.pre
UserSchema.pre('save', (next) => {
  const user = this,
        SALT_ROUNDS = process.env.SALT_ROUNDS;
  if (!user.isModified('password')) { return next(); }
  return bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) { return next(err); }
    return bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      return next();
    });
  });
});


// can use function composition for every method here...
  // UserSchema.pre is composed of UserSchema.generateHash, etc. y = f(g(x))
  // UserSchema.preSave(bcrypt.genSalt(bcrypt.hash))
