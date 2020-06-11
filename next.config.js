const config = require('config')

const DOMAIN =
    process.env.NODE_ENV !== 'production'
        ? config.get('LOCALHOST')
        : config.get('HOST_URL')

module.exports = {
    serverRuntimeConfig: {

        SECRET: config.get('jwtPrivateKey'),
        MAILBOX: config.get('MAILBOX'),
        PASSWORD: config.get('PASSWORD'),
        USER: config.get('USER'),
        HOSTSMTP: config.get('HOSTSMTP'),


    },
    publicRuntimeConfig: {

        DOMAIN,
        
    },
}
