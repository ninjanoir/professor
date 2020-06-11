const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const postSchema = new mongoose.Schema({
    coachId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
    },
    videoId: { type: String },
    info: { type: String },
    like: { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const validatePosts = post => {
    const schema = Joi.object({
        coachId: Joi.objectId().required(),
        videoId: Joi.string(),
        info: Joi.string(),
        like: Joi.number(),
    })

    return schema.validate(post)
}

exports.validate = validatePosts
exports.Post = mongoose.models.Post || mongoose.model('Post', postSchema)
