const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
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
        required: true,
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
    subscribedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    content: [{
        type: Schema.Types.ObjectId,
        ref: 'Content'
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 5;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;


