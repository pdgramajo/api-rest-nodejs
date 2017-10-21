'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {

    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN_BASE)

}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {

        try {

            const payload = jwt.decode(token, config.SECRET_TOKEN_BASE)

            if (payload.exp < moment().unix()) {
                reject({
                    status: 401,
                    message: 'el token expiró'
                })
            }

            resolve(payload.sub)

        } catch (error) {
            reject({
                status: 500,
                message: 'error en el servidor: ' + error
            })
        }

    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}