'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.Promise = global.Promise;
mongoose.connect(config.bd, { useMongoClient: true })
    .then(() => {
        app.listen(config.port, () => {
            console.log(`api rest corriendo en http://localhost:${config.port}`)
        })
    })
    .catch(err => console.error(err));