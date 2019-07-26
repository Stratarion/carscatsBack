const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AccessSchema = new Schema({
  email: {
      type: String,
      required: true
  }, 
  startFrom: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
  },
  endTo: {
    type: Number,
  }
})

const AccessModel = mongoose.model('AccessModel', AccessSchema)
module.exports = AccessModel