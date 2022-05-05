const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/storageControll'
mongoose.connect(url);
module.exports = mongoose;