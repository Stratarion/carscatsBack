const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TarifSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  }
})
const TarifModel = mongoose.model('TarifModelю', TarifSchema)
module.exports = TarifModel