const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    required: false,
    enum: ['creator', 'follower'], default: 'follower'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  credits: {
    type: Number,
    default: 0
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Video' // Assuming you have a Video model
    }
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Image' // Assuming you have an Image model
    }
  ]
  // subscribedTo: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Subscription'
  //   }
  // ],
  // content: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Content'
  //   }
  // ]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 5;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  // Log the comparison result
  //console.log(`Password comparison result: ${isMatch}`);
  return isMatch;
};

const User = model('User', userSchema);
module.exports = User;


