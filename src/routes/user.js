const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/user-model")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        contry: req.body.contry,
        phone: req.body.phone,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        contry: user.contry,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: 'User does not exist' })
                }
            } else {
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/users', (req, res) => {
    User.find({}, 'first_name last_name role contry email phone createdAt', (err, users) => {
        if (err) {
            res.sendStatus(500)
        } else {
            console.log(users[0])
            res.send({ users: users })
        }
    }).sort({ _id: -1 })
})

users.put('/users/:id', (req, res) => {
    console.log(req.params.id)
    // User.findById(req.body.id).then (user => {console.log(user)})
    User.findById(req.body.id, 'first_name phone', (err, user) => {
        if (err) {
        console.log(err)
        } else {
            console.log(user)

            if (req.body.phone) {
                user.phone = req.body.phone
            }
            if (req.body.first_name) {
                user.first_name = req.body.first_name
            }
            if (req.body.last_name) {
                user.last_name = req.body.last_name
            }
            if (req.body.email) {
                user.email = req.body.email
            }
            if (req.body.contry) {
                user.contry = req.body.contry
            }
            
        }
        user.save(err => {
            if (err) {
              res.sendStatus(500)
            } else {
              res.sendStatus(200)
            }
          })
    })
})
module.exports = users