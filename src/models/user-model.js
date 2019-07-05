const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
 
// 2
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contry: String,
  phone: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  
  role: {
    type: String,
    default: 'user'
  }
}, {
 
  // 3
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
 
// 4
const User = mongoose.model('user', userSchema)
module.exports = User 