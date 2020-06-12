const next = require('next')
const config = require('config')
const db = require('../utils/dbConnect')

let URI = process.env.MONGO_URI || config.get('MONGO_URI')

db(URI)


const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000
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

        server.use('/api/coach', routeCoach)
        server.use('/api/register', signUp)
        server.use('/api/auth', signIn)
        server.use('/api/member', memberPlace)
        server.use('/api/upload', postAvatar)
        server.use('/api/categorie', categorie)
        server.use('/api/pros', entreprise)
        server.use('/api/subscribe', newsletter)
        server.use('/api/posts', postsRoute)
        server.use('/api/mailer', contactMailer)
        server.use('/api/upload', express.static('./public/uploads'))

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) console.error('une erreur est survenue', err)

            console.log(`Prêt sur le port ${port}`)
        })
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
