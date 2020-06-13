import axios from 'axios'
require('dotenv').config()

import getConfig from 'next/config'


const {publicRuntimeConfig} =getConfig()

export default axios.create({
    baseURL: publicRuntimeConfig.API_ENDPOINT
})
