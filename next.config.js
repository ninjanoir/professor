const config = require('config')

const DOMAIN =
    process.env.NODE_ENV !== 'production'
        ? config.get('LOCALHOST')
        : config.get('HOST_URL')

module.exports = {
    serverRuntimeConfig: {

        SECRET: config.get('jwtPrivateKey'),
    },
    publicRuntimeConfig: {

        DOMAIN,
    },
}
