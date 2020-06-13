const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies['x-auth-token']

    if (!token) return res.status(401).send('acces refusé, token required')

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.member = decoded
        next()
    } catch (error) {
        res.status(403).send('token invalide')
    }
}

module.exports = auth
