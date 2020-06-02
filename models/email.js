const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const emailSchema = new mongoose.Schema({
    email: String,
})

const validateMail = email => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    })

    return schema.validate(email)
}

exports.validate = validateMail
exports.Email = mongoose.models.Email || mongoose.model('Email', emailSchema)
