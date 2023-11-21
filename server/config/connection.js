const mongoose = require('mongoose');
try{
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/mernshopping');
// console.log("no estas tonto");
}catch{
    console.log("si lo estas");
}

module.exports = mongoose.connection;
