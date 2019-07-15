const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TarifSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true

  },
  description: {
    type: String
  },
  duration: { // продолжительность действия тарифа
    type: Number,
    required: true

  },
  price: {
    type: Number,
    required: true

  }

})
const TarifModel = mongoose.model('TarifModel', TarifSchema)
module.exports = TarifModel