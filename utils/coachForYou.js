import axios from 'axios'

import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

const URL = process.env.VERCEL_URL || publicRuntimeConfig.DOMAIN





export default axios.create({
    baseURL: `${URL}/api`,
})
