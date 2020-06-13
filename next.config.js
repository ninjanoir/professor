


module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                fs: 'empty',
            }
        }

        return config
    },

    pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],

    compress: false,

    serverRuntimeConfig: {
        SECRET: process.env.SECRET,
        MAILBOX: process.env.MAILBOX,
        PASSWORD: process.env.PASSWORD,
        USER: process.env.USER,
        HOSTSMTP: process.env.HOSTSMTP,
        HOSTPORT: process.env.HOSTPORT,
        MONGO_URI: process.env.MONGO_URI,
    },
    publicRuntimeConfig: {
        API_ENDPOINT: `${process.env.LOCALHOST}:${process.env.PORT}/api`,
        API_PROD: 'https://coach-for-you.herokuapp.com/api'

    },
}
