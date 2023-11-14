const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({

    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date, default: Date.now
    },
    endDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    subscriptionType: {
        type: String,
        enum: ['basic', 'premium', 'exclusive'],
        default: 'basic'
    },
    // paymentDetails: {
    //     amount: Number,
    //     paymentMethod: String,
    //     paymentDate: Date
    // }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;