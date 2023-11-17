const { Schema, model } = require('mongoose');

const contentSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String
    },
    contentType: {
        type: String, enum: ['image', 'video', 'text'],
        default: 'text'
    },
    price: {
        type: Number,
        default: 0
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
});

const Content = model('Content', contentSchema);
module.exports = Content;