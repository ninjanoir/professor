const express = require('express')
const router = express.Router()
const { Member, validate } = require('../models/member')

const asyncMiddleware = require('../middleware/async')
const bcrypt = require('bcrypt')

router.post(
    '/',
    asyncMiddleware(async (req, res) => {
        const { error } = validate(req.body)

        if (error) return res.status(400).send(error.details[0].message)

        let member = await Member.findOne({ email: req.body.email }).catch(e =>
            console.error('memner fetched failed--', e)
        )
        if (member)
            return res
                .status(400)
                .send('cette email est déjà utilisé par un utilisateur')

        member = new Member({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: req.body.password,
            compte: req.body.compte,
        })

        //crypter le mot de passe
        const saltrounds = 10
        bcrypt.genSalt(saltrounds, (err, salt) => {
            if (err) return res.status(500).send('une erreur est survenue')
            bcrypt.hash(member.password, salt, async (err, hash) => {
                if (err) return res.status(500).send('une erreur est survenue')
                member.password = hash
                await member.save()
            })
        })

        res.json({ success: true })
    })
)

module.exports = router
