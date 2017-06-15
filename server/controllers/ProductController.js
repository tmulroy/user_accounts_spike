const Product = require('../models/product')

class ProductController {
  static getOne(req, res){
    const { productId } = req.body
    Product.findOne({ productId }, (err, product) => {
      if (err || !product) {
        res.status(401).end()
      } else {
        console.log('product exists', product)
        res.status(200).json({ product })
      }
    })
  }

  static getAll(req, res){
    Product.find({}, (err, products) => {
      if (err || !products) {
        res.status(401).end()
      } else {
        console.log('products', products)
        res.status(200).json({ products })
      }
    })
  }

  // static create(){}
  // static delete(){}
  // static update(){}

}

module.exports = ProductController
