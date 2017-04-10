const mongoose = require('mongoose');

module.exports.connect = (url) => {
  mongoose.connect(url)
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  require('./user')
}

// should handle more errors
// do I need mongoose.connection.once???

// TODO: make a session collection with mongoose
