const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: String,
  price: Number,
  name: String,
  description: String,
  imageUrl: String,
  stock: Number,
  categoryId: String
})

module.exports = mongoose.model('Product', ProductSchema)
