const mongoose = require('mongoose');

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
  //user id
  // user: {id:{type:mongoose.Schema.Types.ObjectId, ref:"User.js"}},
})


module.exports = mongoose.model('Image', imageSchema);
