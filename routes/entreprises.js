const express = require('express')
const router = express.Router()

const { Entreprise, validate } = require('../models/entreprise')

const auth = require('../middleware/auth')
const asyncMiddleware = require('../middleware/async')

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        const memberId = req.member._id


        const  error  = validate({ membreId: req.member._id })
        if (error) return res.status(400).send(error.details[0].message)

        Entreprise.findOne({ membreId: memberId }, (err, isregistered) => {
            if (err) return console.error(err)
            if (isregistered) {
                return res
                    .status(400)
                    .json({ success: false, data: isregistered })
            }
        }).catch(e => {
            console.error(e)
        })

        let update = {}

        for (let [key, value] of Object.entries(req.body)) {
            update[`${key}`] = value
        }

        const newEntreprise = new Entreprise({
            ...update,
            membreId: memberId,
        })

        await newEntreprise.save()

        res.status(200).json({ success: true })
    })
)

router.put(
    '/update',
    auth,
    asyncMiddleware(async (req, res) => {
        let update = {}

        for (let [key, value] of Object.entries(req.body)) {
            update[`${key}`] = value
        }

        const entreprise = await Entreprise.findOneAndUpdate(
            {membreId: req.member._id},
            update
        ).select('-password -__v -createAt -confirmed -_id')

        if (!entreprise)
            return res.status(400).send('aucune entreprise ne correspond')

        res.status(200).send(entreprise)
    })
)

module.exports = router
