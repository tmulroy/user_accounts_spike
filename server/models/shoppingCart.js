const mongoose = require('mongoose')

const ShoppingCartSchema = new mongoose.Schema({
  productIds: [String],
  totalPrice: Number,
})

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema)
