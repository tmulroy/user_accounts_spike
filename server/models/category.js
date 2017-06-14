const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  productIds: [String]
})

module.exports = mongoose.model('Category', CategorySchema)
