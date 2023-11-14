const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentSchema = new Schema({
    contentId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
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

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;