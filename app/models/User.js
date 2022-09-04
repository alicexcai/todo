const mongoose = require('mongoose')

// COMMENT: define the schema for the user
const UserSchema = new mongoose.Schema({
  // COMMENT: specify the googleId as a required string input
  googleId: {
    type: String,
    required: true,
  },
  // COMMENT: specify the displayName as a required string input
  displayName: {
    type: String,
    required: true,
  },
  // COMMENT: specify the firstName as a required string input
  firstName: {
    type: String,
    required: true,
  },
  // COMMENT: specify the lastName as a required string input
  lastName: {
    type: String,
    required: true,
  },
  // COMMENT: specify the image as a string (url)
  image: {
    type: String,
  },
  // COMMENT: specify the email as a required string input
  email:{
  type:String,
  required: true,
  },
  // COMMENT: specify the createdAt as an input with a default timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', UserSchema)
