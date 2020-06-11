const express = require('express')
const router = express.Router()
const { Categorie } = require('../models/categorie')

router.post('/', async (req, res) => {
    const cat = new Categorie({
        nom: req.body.nom,
        icon: req.body.icon,
    })

    await cat.save()

    res.status(200).json({ success: true, data: cat })
})

router.get('/:slug', async (req, res) => {
    let cats = await Categorie.find({
        nom: { $regex: '.*' + req.params.slug + '.*' },
    }).catch(e => console.error('loading categorie failed', e))

    res.status(200).send(cats)
})

module.exports = router
