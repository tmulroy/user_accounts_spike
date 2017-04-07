const mongoose = require('mongoose');

module.exports.connect = (process.env.DATABASE_URL) => {
  mongoose.connect(process.env.DATABASE_URL)
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${error}`);
    process.exit(1);
  });

  mongoose.connection.once('open', () => {
    // connected
    require('./users')
  });
}

// should handle more errors
// do I need mongoose.connection.once???
