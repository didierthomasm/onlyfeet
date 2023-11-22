const { Schema, model } = require('mongoose');

const videoSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
});

const Video = model('Video', videoSchema);
module.exports = Video;
