const {Schema, model} = require('mongoose');

const imageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
  width: Number,
  height: Number,
  format: String,
  resource_type: String,
  folder: String,
  created_at: String,

  // User reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
})

const Image = model('Image', imageSchema);
module.exports = Image;