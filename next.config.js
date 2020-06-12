const config = require('config')

const DOMAIN =
    process.env.NODE_ENV !== 'production'
        ? config.get('LOCALHOST')
        : process.env.HOST_URL

module.exports = {
    serverRuntimeConfig: {

        SECRET: process.env.SECRET || config.get('jwtPrivateKey'),
        MAILBOX: process.env.MAILBOX || config.get('MAILBOX'),
        PASSWORD:  process.env.PASSWORD || config.get('PASSWORD'),
        USER: process.env.USER || config.get('USER'),
        HOSTSMTP: process.env.HOSTSMTP || config.get('HOSTSMTP'),
        


    },
    publicRuntimeConfig: {

        DOMAIN: DOMAIN

    },
}
