const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NewsSchema = new Schema({
  title: {
      type: String,
      required: true
  }, 
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  other: {
    type: {},
  }
})

const NewsModel = mongoose.model('NewsModel', NewsSchema)
module.exports = NewsModel