const express = require('express')

const router = express.Router()

const Joi = require('@hapi/joi')

const asyncMiddleware = require('../middleware/async')

const mailer = require('../utils/mailer')

router.post(
    '/',
    asyncMiddleware(async (req, res) => {

        console.log(req.body)


        const { error } = validate(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }

        let response = await mailer(req.body).catch(e => console.error('mailer failed------', e))

        if(response.rejected.length === 0){
            res.status(200).json({success: true})
        }

    })
)

const validate = mail => {
    const schema = Joi.object({
        nom: Joi.string().required(),
        email: Joi.string().email().required(),
        message: Joi.string().required(),
    })

    return schema.validate(mail)
}

module.exports = router
