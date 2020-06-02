const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const entrepriseShema = new mongoose.Schema({
    membreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    siret: {
        type: Number,
        min: 9,
        max: 14,
        trim: true,
        unique: true
    },
    statutJuridique: {
        type: String,
        trim: true,
    },
    raisonSociale: {
        type: String,
        trim: true,
    },
    siegeSocial: {
        type: String,
        maxlength: 255,
        trim: true,
    },
    codePostal: {
        type: Number,
        min: 0,
        max: 5,
    },
    ville: {
        type: String,
        trim: true,
    },
    pays: {
        type: String,
        trim: true,
    },
})

const validateEntreprise = entreprise => {
    const schema = Joi.object({
        membre: Joi.objectId().required(),
    })

    schema.validate(entreprise)
}

exports.validate = validateEntreprise
exports.Entreprise =
    mongoose.models.Entreprise || mongoose.model('Entreprise', entrepriseShema)
