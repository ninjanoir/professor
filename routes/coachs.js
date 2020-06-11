const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Fawn = require('fawn')

Fawn.init(mongoose)

const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const { Coach, validate } = require('../models/coach')
const { Avatar } = require('../models/avatar')

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        const coachs = await Coach.find()
            .populate('membre', 'nom prenom')
            .catch(e => console.error('GET coachs failed--', e))

        let response = []

        if (coachs.length > 0) {
            for (let i = 0; i < coachs.length; i++) {
                let avatar = await Avatar.findOne({
                    membre: coachs[i].membre._id,
                }).select('avatar').catch(e => console.error('avatar fetch failed---', e))

                let coach = coachs[i]

                response.push({ avatar, coach })
            }

            await res.status(200).json({ success: true, response })
        }
    })
)

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        const memberId = req.member._id

        const { error } = validate({ membre: memberId })
        if (error) return res.status(400).send(error.details[0].message)

        let already = await Coach.findOne({ membre: memberId }).catch(e => {
            console.error('is already coach checking failed----', e)
        })

        if (already) {
            res.status(400).json({ success: false })
        }

        let update = {}

        for (let [key, value] of Object.entries(req.body)) {
            update[`${key}`] = value
        }

        const newcoach = new Coach({
            ...update,
            membre: memberId,
        })

        //transcation fawn
        try {
            new Fawn.Task()
                .save('coaches', newcoach)
                .update('members', { _id: memberId }, { isCoach: true })
                .run({ useMongoose: true })
                .then(() =>
                    res.status(200).json({ success: true, response: newcoach })
                )
        } catch (e) {
            res.status(500).send('une erreur vient de se produire')
        }
    })
)

router.put(
    '/update',
    auth,
    asyncMiddleware(async (req, res) => {
        const memberId = req.member._id

        let update = {}

        for (let [key, value] of Object.entries(req.body)) {
            update[`${key}`] = value
        }

        let coach = await Coach.findOneAndUpdate({ membre: memberId }, update, {
            new: true,
        }).catch(e => console.error('update coach failed--------', e))

        if (!coach) {
            res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, response: coach })
    })
)

router.get(
    '/:slug',
    asyncMiddleware(async (req, res) => {
        let coachs = await Coach.find({
            'competence.nom': req.params.slug,
        })
            .populate('membre', 'nom prenom ')
            .select('-competence -createdAt -__v')

        let response = []

        if (coachs.length > 0) {
            for (let i = 0; i < coachs.length; i++) {
                let avatar = await Avatar.findOne({
                    membre: coachs[i].membre._id,
                }).select('avatar')

                let coach = coachs[i]

                response.push({ avatar, coach })
            }

            res.status(200).json({ success: true, response })
        } else {
            res.json({
                message: 'désolé aucun coach ne correspond à votre recherche',
            })
        }
    })
)

router.get(
    '/:id',
    asyncMiddleware(async (req, res) => {})
)

module.exports = router
