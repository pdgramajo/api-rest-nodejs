'use strict'

const Product = require('../models/product')

function getProduct(req, res) {

    let productId = req.params.productId

    Product.findById(productId, (err, product) => {

        if (err) res.status(500).send({ message: `error al realizar la peticion ${err}` })

        if (!product) res.status(404).send({ message: `el producto no existe ` })

        res.status(200).send({ product })
    })

}

function getProducts(req, res) {

    Product.find({}, (err, products) => {

        if (err) res.status(500).send({ message: `error al realizar la peticion ${err}` })

        if (!products) res.status(404).send({ message: ` no existe ` })

        res.status(200).send({ products })
    })

}

function createProduct(req, res) {

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.category

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `error al guardar el producto ${err}` })
        res.status(200).send({ product: productStored })
    })

}

function updateProduct(req, res) {

    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productoUpdated) => {
        if (err) res.status(500).send({ message: `error al actualizar el producto ${err}` })
        res.status(200).send({ product: productoUpdated })
    })

}

function deletedProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({ message: `error al realizar la peticion ${err}` })
        if (!product) res.status(404).send({ message: `el producto no existe ` })
        product.remove(err => {
            if (err) res.status(500).send({ message: `error al borrar el producto ${err}` })
            res.status(200).send({ message: `el producto ha sido eliminado ` })
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deletedProduct
}