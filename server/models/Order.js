const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema ({
    purchaseDate: {
        type: Date,
        default: Date.Now
    },
    
    products: [
        {
        type: Schema.Types.ObjectID,
        ref: 'Product'
    }
]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 