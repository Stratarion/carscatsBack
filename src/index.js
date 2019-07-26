const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');



mongoose.Promise = global.Promise
// const MongoClient = require("mongodb").MongoClient;

const app = express()


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.use(require('./routes/index'))
app.use(require('./routes/tarifs'))
app.use(require('./routes/user'))
app.use(require('./routes/mailSendler'))
app.use(require('./routes/access'))
app.use(require('./routes/news'))





mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

