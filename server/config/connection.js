const mongoose = require('mongoose');
try {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/mernshopping');


  console.log('Mongoose is connected');

} catch {

  console.log('error');
}

module.exports = mongoose.connection;
