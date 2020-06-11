const express = require('express')
const router = express.Router()

const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')

const { validate, Post } = require('../models/post')
const { Coach } = require('../models/coach')
const { Avatar } = require('../models/avatar')

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        let store = {}

        for (let [key, value] of Object.entries(req.body)) {
            store[`${key}`] = value
        }

        let post = new Post({
            coachId: req.body.coachId,
            ...store,
        })

        let result = await post.save()

        res.status(200).json({ success: true, result })
    })
)

router.get(
    '/:id',
    asyncMiddleware(async (req, res) => {
        const coach = await Coach.findOne({ _id: req.params.id })
            .populate('membre', 'nom prenom isCoach email compte')
            .select('-createdAt -__v ').catch(e => console.error('fetch post coach failed---', e))

        if (!coach) {
            return res.status(404).send('url invalide')
        }

        const avatar = await Avatar.findOne({ membre: coach.membre }).select(
            'avatar'
        ).catch(e => console.error('faitched avatar post failed----', e))

        const coachPost = await Post.find({ coachId: req.params.id }).select(
            '-createdAt -__v'
        ).catch(e => console.error('fetched post failed-----', e))

        if (!coachPost) {
            res.send('aucun post trouvé ')
        }

        let data = {}

        data['profil'] = coach
        data['coachPost'] = coachPost
        data['imageProfil'] = avatar

        res.status(200).json(data)
    })
)

router.delete(
    '/:id',
    auth,
    asyncMiddleware(async (req, res) => {
        const post = await Post.findByIdAndDelete({ _id: req.params.id }).catch(e => console.error('failed fecth post by id---', e))

        res.json({ success: true, post })
    })
)

module.exports = router
