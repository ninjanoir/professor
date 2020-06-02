const jwt = require('jsonwebtoken')

const config = require('config')

const auth = (req, res, next) => {
    console.log('auth---------------------------cookie',req.cookies['x-auth-token'])
    const token = req.cookies['x-auth-token']

    console.log('auth---------------------------headers',req.headers['x-auth-token'])


    console.log('auth middle token ', token)

    if (!token) return res.status(401).send('acces refusé, token required')

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.member = decoded
        next()
    } catch (error) {
        res.status(403).send('token invalide')
    }
}

module.exports = auth
