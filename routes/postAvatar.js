const express = require('express')
const router = express.Router()
const upload = require('../middleware/image')

const { Avatar, validate } = require('../models/avatar')

const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')

router.post(
    '/',
    [auth, upload.single('avatar')],
    asyncMiddleware(async (req, res) => {
        const { error } = validate(req.file)
        if (error) return res.status(400).send(error.details[0].message)

        const avatar = new Avatar({
            avatar: req.file.path,
            membre: req.member._id,
        })

        await avatar.save()

        res.status(200).json({ success: true })
    })
)

router.put(
    '/:id',
    [auth, upload.single('avatar')],
    asyncMiddleware(async (req, res) => {
        const { error } = validate(req.file)
        if (error) return res.status(400).send(error.details[0].message)

        let avatar = await Avatar.findByIdAndUpdate(req.params.id, {
            avatar: req.file.path,
        }).catch(e => console.error('update avatar failed---', e))

        await avatar.save()

        res.status(200).json({ success: true })
    })
)

module.exports = router
