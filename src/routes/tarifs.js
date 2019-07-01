const express = require('express')
const router = express.Router()
const Tarif = require('../models/tarif-model')

router.post('/tarifs', (req, res) => {
    const tarif = new Tarif({
      title: req.body.title,
      description: req.body.description
    })
    tarif.save((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({
          success: true,
          message: `Post with ID_${data._id} saved successfully!`
        })
      }
    })
  })


router.get('/tarifs', (req, res) => {
    Tarif.find({}, 'title description', (err, tarifs) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ tarifs: tarifs })
        }
    }).sort({ _id: -1 })
})
module.exports = router