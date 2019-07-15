const express = require('express')
const router = express.Router()
const Tarif = require('../models/tarif-model')

router.post('/tarifs', (req, res) => {
    const tarif = new Tarif({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      price: req.body.price
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
    Tarif.find({}, 'title description duration price', (err, tarifs) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ tarifs: tarifs })
        }
    }).sort({ _id: -1 })
})

router.get('/tarifs/:id', (req, res) => {
  Tarif.findById(req.params.id, 'title description duration price', (err, tarif) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(tarif)
    }
  })
})


router.put('/tarifs/:id', (req, res) => {
  Tarif.findById(req.params.id, 'title description duration', (err, tarif) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.title) {
        tarif.title = req.body.title
      }
      if (req.body.description) {
        tarif.description = req.body.description
      }
      if (req.body.duration) {
        tarif.duration = req.body.duration
      }
      if (req.body.price) {
        tarif.price = req.body.price
      }
      tarif.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

router.delete('/tarifs/:id', (req, res) => {
  Tarif.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router