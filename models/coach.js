const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const coachSchema = new mongoose.Schema({
    membre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        //unique: [true, 'membre dejà coach'],
    },
    competence: [{
        icon: String,
        nom: String
    }],
    meta: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [1024, 'ne dois pas exceder 1024 caractères'],
    },
    like: {
        type: Number,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const validateCoach = member => {
    const schema = Joi.object({
        membre: Joi.objectId().required(),
    })

    return schema.validate(member)
}

exports.Coach = mongoose.models.Coach || mongoose.model('Coach', coachSchema)
exports.validate = validateCoach
