var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');


mongoose.connect('mongodb://localhost:27017/localert');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error:'));

module.exports = db;
