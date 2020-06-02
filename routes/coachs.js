const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Fawn = require('fawn')

Fawn.init(mongoose)

const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const { Coach, validate } = require('../models/coach')
const { Member } = require('../models/Member')


router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        // const listOfCoachs = Coach.find()

        const coachs = [
            {
                name: 'Julien Assange',
                resume: 'Coach en programmation informatique',
                avatar:
                    'https://cdn.pixabay.com/photo/2016/12/27/21/49/application-1934972_960_720.jpg',
            },
            {
                name: 'Paloma Indi Josephine',
                resume: 'Professeur de guitare',
                avatar:
                    'https://cdn.pixabay.com/photo/2015/09/17/14/24/guitar-944262_960_720.jpg',
            },
            {
                name: 'Leny Robinson',
                resume: 'Coach Photographe et aventurier',
                avatar:
                    'https://cdn.pixabay.com/photo/2016/03/17/11/42/photographer-1262797_960_720.jpg',
            },
            {
                name: 'Julie Yellow',
                resume: 'Experte en botanique',
                avatar:
                    'https://cdn.pixabay.com/photo/2018/04/27/04/06/woman-3353711_960_720.jpg',
            },
            {
                name: 'Gérard Lebon',
                resume: 'expert en maçonnerie',
                avatar:
                    'https://cdn.pixabay.com/photo/2015/08/05/04/02/people-875597_960_720.jpg',
            },
            {
                name: 'Giselle crawford',
                resume: 'Couturiere de mode',
                avatar:
                    'https://cdn.pixabay.com/photo/2020/04/15/12/09/face-5046403_960_720.jpg',
            },
        ]
        await res.status(200).json(coachs)
    })
)

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        const memberId = req.member._id

        const { error } = validate({ membre: memberId })
        if (error) return res.status(400).send(error.details[0].message)

        Coach.findOne({ membre: memberId }, (err, isregistered) => {
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
            res.status(200).json({ success: true, response: newcoach })
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
            console.log('dans le PUT',value)
            update[`${key}`] = value
        }

        console.log('dans le PUT',update)

        let coach = await Coach.findOneAndUpdate({ membre: memberId }, update, {
            new: true,
        })

        res.status(200).json({ success: true, response: coach })
    })
)

module.exports = router
