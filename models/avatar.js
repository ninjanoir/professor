const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)


const schemAvatar = new mongoose.Schema({
    avatar:{
        type: String
    },
    membre: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Member'
    }
    
})


const validateAvatar = avatar => {
    const schema = Joi.any().required()


    return schema.validate(avatar)
}


exports.Avatar = mongoose.models.Avatar || mongoose.model('Avatar', schemAvatar)
exports.validate = validateAvatar