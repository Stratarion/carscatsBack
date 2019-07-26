const express = require('express')
const router = express.Router()
const AccessSchema = require('../models/access-model')
const Tarif = require('../models/tarif-model')
const moment = require('moment');
// moment().format();


// добавление доступа пользователя.
// ищем доступы по айдишнику пользователя. Если доступы были, то работаем с этим файлом. Если ранее доступа не было, создаем новый
router.post('/access', (req, res) => {

    // структура запроса
    // req.body {
    //     email,
    //     tarif_id,
    // }

    // поиск тарифа
    Tarif.findById(req.body.tarif_id, 'duration', (errTarif, tarif) => {
        if (errTarif) {
            console.log(errTarif)
            res.sendStatus(500)
        } else {
            //  поиск доступа
            AccessSchema.find({email: req.body.email }, 'duration startFrom', (errAccess, access) => {
                if (access.length === 0) {
                    // создание доступа если у пользователя небыло доступа ранее
                    const newAccess = new AccessSchema({
                        email: req.body.email,
                        startFrom: moment(),
                        duration: tarif.duration,
                        // endTo: req.body.endTo
                    })

                    newAccess.save((err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send({
                            success: true,
                            message: "Доступ открыт!",
                            data: data
                            })
                        }
                    })

                } else if (errAccess) {
                    res.sendStatus(500)
                } else if (access.length > 1) {
                    console.log('Несолько записей одного юзера')
                } else {
                    // продление доступа при наличии оплаченного времени

                    let newDate = moment()
                    let oldDate = moment(access[0].startFrom)
                    var durationBetwenOldAndNewDate = Math.floor(moment.duration(newDate.diff(oldDate)).asDays()) 
                    let diffDuration = 0
                    if (durationBetwenOldAndNewDate <= access[0].duration) {
                        diffDuration = access[0].duration - durationBetwenOldAndNewDate
                    }
                    access[0].duration = diffDuration + tarif.duration
                    access[0].startFrom = newDate
                    access[0].save(err => {
                        if (err) {
                            // запись события в журнал
                            res.sendStatus(500)
                        } else {
                            res.sendStatus(200)
                        }
                    })
                }
            })
        }
    })
})


router.get('/access', (req, res) => {
    console.log(req.body)
    AccessSchema.find({email: req.query.email}, 'startFrom duration', (err, access) => {
        if (err) {
            res.sendStatus(500)
        } else {
            console.log(access)

            res.send({ access: access })
        }
    })
})

// router.get('/tarifs/:id', (req, res) => {
//   Tarif.findById(req.params.id, 'title description duration price', (err, tarif) => {
//     if (err) {
//       res.sendStatus(500)
//     } else {
//       res.send(tarif)
//     }
//   })
// })


// router.put('/tarifs/:id', (req, res) => {
//   Tarif.findById(req.params.id, 'title description duration', (err, tarif) => {
//     if (err) {
//       console.log(err)
//     } else {
//       if (req.body.title) {
//         tarif.title = req.body.title
//       }
//       if (req.body.description) {
//         tarif.description = req.body.description
//       }
//       if (req.body.duration) {
//         tarif.duration = req.body.duration
//       }
//       if (req.body.price) {
//         tarif.price = req.body.price
//       }
//       tarif.save(err => {
//         if (err) {
//           res.sendStatus(500)
//         } else {
//           res.sendStatus(200)
//         }
//       })
//     }
//   })
// })

// router.delete('/tarifs/:id', (req, res) => {
//   Tarif.remove({ _id: req.params.id }, err => {
//     if (err) {
//       res.sendStatus(500)
//     } else {
//       res.sendStatus(200)
//     }
//   })
// })

module.exports = router