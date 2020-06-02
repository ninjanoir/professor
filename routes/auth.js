const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')
const asyncMiddleware = require('../middleware/async')
const { Member } = require('../models/member')
const bcrypt = require('bcrypt')

router.post(
    '/',
    asyncMiddleware(async (req, res) => {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        let member = await Member.findOne({ email: req.body.email })
        if (!member) res.status(400).send('email ou mot passe invalide')

        const validPassword = await bcrypt.compare(
            req.body.password,
            member.password
        )
        if (!validPassword)
            return res.status(400).send('email ou mot de passe invalide')

        const token = member.generateAuthToken()

        res.header('x-auth-token', token).json({ success: true })
    })
)

const validate = req => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(7).max(12).required(),
    })

    return schema.validate(req)
}

module.exports = router
