import axios from 'axios'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()


export default axios.create({
    baseURL: `${publicRuntimeConfig.DOMAIN}/api`
})