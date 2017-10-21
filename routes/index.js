'use strict'

const express = require('express')
const api = express.Router()
const auth = require('../middlewares/auth')

const productController = require('../controllers/product')
const userController = require('../controllers/user')

api.get('/product', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.createProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deletedProduct)

api.post('/user', userController.signUp)
api.post('/token', userController.singIn)

api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'tienes acceso' })
})

module.exports = api