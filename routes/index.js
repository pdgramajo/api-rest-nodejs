'use strict'

const express = require('express')
const api = express.Router()

const productController = require('../controllers/product')

api.get('/product', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.createProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deletedProduct)

module.exports = api