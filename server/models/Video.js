const mongoose = require('mongoose');
const User = require('./User');

const videoSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
  playback_url: String,
  width: Number,
  height: Number,
  format: String,
  resource_type: String,
  folder: String,
  duration: Number,
  created_at: String,
  //user id
  // user: {id:{type:mongoose.Schema.Types.ObjectId, ref:"User.js"}},

})

module.exports = mongoose.model('Video', videoSchema);
