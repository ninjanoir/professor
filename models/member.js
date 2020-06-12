const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const memberSchema = new mongoose.Schema({
    prenom: {
        type: String,
        required: [true, 'chanmps prénom est requis'],
        trim: true,
        maxlength: [40, 'prenom ne peut exceder 40 characteres'],
    },
    nom: {
        type: String,
        required: [true, 'chanmps nom est requis'],
        trim: true,
        maxlength: [40, 'nom ne peut exceder 40 characteres'],
    },
    email: {
        type: String,
        required: [true, 'champs email est requis'],
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        min: 0,
    },
    password: {
        type: String,
        required: [true, 'champs password requis'],
    },
    compte: {
        type: String,
        enum: ['free', 'prenium', 'gold'],
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar',
    },
    dateNaissance: {
        type: Date,
    },
    nationalite: {
        type: String,
    },
    isCoach: {
        type: Boolean,
        default: false,
    },
})

//method generate user token
const SECRET = process.env.SECRET || config.get('jwtPrivateKey')
memberSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, SECRET, {
        expiresIn: '1h',
    })
    return token
}

const memberValidation = member => {
    schema = Joi.object({
        nom: Joi.string().max(50).required(),
        prenom: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(7).required(),
        compte: Joi.string().required(),
    })

    return schema.validate(member)
}

exports.Member =
    mongoose.models.Member || mongoose.model('Member', memberSchema)
exports.validate = memberValidation
