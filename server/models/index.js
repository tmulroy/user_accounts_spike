const mongoose = require('mongoose');

module.exports.connect = (url) => {

  mongoose.Promise = require('bluebird');
  mongoose.connect(url);

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  require('./user');

  mongoose.connection.once('open', () => {
    console.log('mongoDB connection ok!');
  });

    // require('./session')

};

// should handle more errors

// TODO: make a session collection with mongoose
