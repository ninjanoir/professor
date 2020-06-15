const next = require('next')
const db = require('../utils/dbConnect')

db(process.env.MONGO_URI)

const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        const categorie = require('../routes/categorie')
        const routeCoach = require('../routes/coachs')
        const signUp = require('../routes/signUp')
        const signIn = require('../routes/auth')
        const postAvatar = require('../routes/postAvatar')
        const memberPlace = require('../routes/userSpace')
        const entreprise = require('../routes/entreprises')
        const newsletter = require('../routes/newsletter')
        const postsRoute = require('../routes/posts')
        const contactMailer = require('../routes/contact')
        const cookieParser = require('cookie-parser')

        server.use(bodyParser.urlencoded({ extended: true }))
        server.use(bodyParser.json())
        server.use(cookieParser())

        server.use('/api/coach', routeCoach, (req, res) => {
            return app.render(req, res, '/', req.query)
        })

        server.use('/api/coach', routeCoach, (req, res) => {
            return app.render(req, res, '/search', req.query)
        })

        server.use('/api/register', signUp, (req, res) => {
            return app.render(req, res, '/register', req.query)
        })
        server.use('/api/auth', signIn, (req, res) => {
            return app.render(req, res, '/login', req.query)
        })
        server.use('/api/member', memberPlace, (req, res) => {
            return app.render(req, res, '/member', req.query)
        })
        server.use('/api/upload', postAvatar, (req, res) => {
            return app.render(req, res, '/member', req.query)
        })
        server.use('/api/categorie', categorie, (req, res) => {
            return app.render(req, res, '/admin', req.query)
        })
        server.use('/api/pros', entreprise, (req, res) => {
            return app.render(req, res, '/member', req.query)
        })
        server.use('/api/subscribe', newsletter, (req, res) => {
            return app.render(req, res, '/', req.query)
        })
        server.use('/api/posts', postsRoute, (req, res) => {
            return app.render(req, res, '/profile/', req.query)
        })
        server.use('/api/mailer', contactMailer, (req, res) => {
            return app.render(req, res, '/profile/', req.query)
        })
        server.use('/api/upload', express.static('./public/uploads'))

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) console.error('une erreur est survenue', err)

            console.log(`Prêt sur le port ${port}, et sur le host ${process.env.host}`)
        })
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
