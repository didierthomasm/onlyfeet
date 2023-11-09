// import the necessary modules from mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// define the User schema
const userSchema = new Schema({
  // define a username field that is a unique, required string and trimmed
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // define an email field that is a unique, required string and must match a specific format
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  // define a password field that is a required string with a minimum length
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // define a thoughts field as an array of ObjectId, referencing 'Thought' documents
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
});

// pre-save hook to hash the password before saving a user
userSchema.pre('save', async function (next) {
  // only hash the password if it's new or has been modified
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // proceed to the next middleware
  next();
});

// method to validate a given password with the hashed password stored in the database
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// create the User model using the schema
const User = model('User', userSchema);

// export the User model
module.exports = User;
