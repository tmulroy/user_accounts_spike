const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))
db.once('open', () => {
  console.log('connection ok')
  // console.log(`db.collections.find`)
  // require('../models/user')
})

module.exports = db
