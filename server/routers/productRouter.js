const productRouter = require('express').Router()
const ProductController = require('../controllers/ProductController')

productRouter.get('/', ProductController.getAll)

module.exports = productRouter
