const express = require('express')
const router = express.Router()
const { validate, Email } = require('../models/email')

const asyncMiddleware = require('../middleware/async')

router.post(
    '/',
    asyncMiddleware(async (req, res) => {
        console.log(req.body)
        const { error } = validate(req.body)
        if (error) return status(400).send(error.details[0].message)

        const email = new Email({ email: req.body.email })

        await email.save()

        res.status(200).json({ success: true })
    })
)

module.exports = router
