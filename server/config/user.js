var db = require('./dbconfig');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Q = require('q');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  id: Number,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: Number},
  created_at: Date,
  updated_at: Date
});

userSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return Q.Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

var User = mongoose.model('user', userSchema);


module.exports = User;