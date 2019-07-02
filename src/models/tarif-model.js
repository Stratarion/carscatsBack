const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TarifSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  duration: { // продолжительность действия тарифа
    type: Number
  },

})
const TarifModel = mongoose.model('TarifModel', TarifSchema)
module.exports = TarifModel