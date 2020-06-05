const config = require('config')

const DOMAIN = process.env.NODE_ENV !== 'production' ? config.get('LOCALHOST') : config.get('HOST_URL')

module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        SECRET: config.get('jwtPrivateKey'),
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        DOMAIN: DOMAIN

    },
}
