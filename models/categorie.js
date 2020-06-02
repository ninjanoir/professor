const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const catschema = new mongoose.Schema({
    nom: { type: String },
    icon: { type: String },
})

const validateCategorie = categorie => {
    const schema = Joi.object({
        nom: Joi.string().max(20).required(),
        icon: Joi.string().required(),
    })

    return schema.validate(categorie)
}

exports.validate = validateCategorie
exports.Categorie =
    mongoose.models.Categorie || mongoose.model('Categorie', catschema)
