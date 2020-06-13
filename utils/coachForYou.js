import axios from 'axios'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const baseURL =
    process.env.NODE_ENV === 'production'
        ? process.env.API_PROD
        : publicRuntimeConfig.API_ENDPOINT

export default axios.create({
    baseURL,
})
