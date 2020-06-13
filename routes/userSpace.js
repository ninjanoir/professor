const express = require('express')
const router = express.Router()
const { Member } = require('../models/member')
const { Coach } = require('../models/coach')
const { Avatar } = require('../models/avatar')
const { Entreprise } = require('../models/entreprise')

const auth = require('../middleware/auth')
const asyncMiddleware = require('../middleware/async')

router.get(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        let payload = {}

        const member = await Member.findById(req.member._id).select(
            '-password -confirmed -createAt -__v -_id'
        )
        if (!member) return res.status(400).send('aucun membre trouvé')

        payload['membreInfo'] = member

        const avatar = await Avatar.findOne({ membre: req.member._id })
            .select('-membre -__v')
            .catch(e => console.error('avatar fecthed failed----', e))
        if (avatar) {
            payload['profileImage'] = avatar
        }

        let coachProfil = await Coach.findOne({
            membre: req.member._id,
        })
            .select('-createdAt -__v -membre')
            .catch(e => console.error('coachProfil failed--', e))

        if (coachProfil) {
            payload['coachInfo'] = coachProfil
        }

        let entreprise = await Entreprise.findOne({
            membreId: req.member._id,
        })
            .select('-_id -__v -membre')
            .catch(e => console.error('entreprise fetched failed---', e))
        if (entreprise) {
            payload['entreprise'] = entreprise
        }

        res.status(200).send(payload)
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

        const member = await Member.findByIdAndUpdate(req.member._id, update)
            .select('-password -__v -createAt -confirmed -_id')
            .catch(e => console.error('update member failed-----', e))

        if (!member) return res.status(400).send('aucun membre ne correspond')

        res.status(200).json({ success: true })
    })
)

module.exports = router
