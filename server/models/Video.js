const {Schema, model} = require('mongoose');
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
  //user reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },

})

const Video = model('User', videoSchema);
module.exports = Video;

