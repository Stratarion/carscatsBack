const express = require('express')
const router = express.Router()
const newsSchema = require('../models/news-model')
const moment = require('moment');


// Добавление новости.
router.post('/news', (req, res) => {

    // структура запроса
    // req.body {
    //     title,
    //     text,
    // }

    const newnews = new newsSchema({
        title: req.body.title,
        text: req.body.text,
        date: moment(),
    })

    newnews.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
            success: true,
            message: "Новость добавлена!",
            data: data
            })
        }
    })

})



router.get('/news', (req, res) => {
    console.log(req.body)
    newsSchema.find({}, 'title text date', (err, news) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ news: news })
        }
    }).sort({ _id: -1 })
})


module.exports = router