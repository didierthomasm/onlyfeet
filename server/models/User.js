const mongoose = require('mongoose');

const { Schema, model } = mongoose; 

const bcrypt = require('bcrypt');
//const Order = require('./Order'); no sé qué hace esto tampoco jajaja

const userSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId, // the field is an object id
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
    username: {
        type: String,
        required: true,
        unique: true,
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
 
    userRole: {
        type: Number,
        required: true,
        default: 2,
    },
// 0 es admin, 1 es creator, 2 es consumer 

    //orders: [Order.schema] no sé qué hace esto, jajaja aiura
});

userSchema.pre('save', async function (next){
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 5;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
    
    
module.exports = User;


