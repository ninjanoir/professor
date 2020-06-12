import axios from 'axios'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const URL =
    process.env.NODE_ENV !== 'production'
        ? `${publicRuntimeConfig.DOMAIN}/api`
        : `${process.env.VERCEL_URL}/api`

console.log(URL)

export default axios.create({
    baseURL: URL,
})
