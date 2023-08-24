const mongoose = require('mongoose');
require('dotenv').config();

const MONGOURL = process.env.MONGOURL;

const connection = mongoose.connect(MONGOURL);
console.log(connection);

module.exports = { connection };