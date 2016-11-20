var messageClient = require('./sendMessage');
var User = require('../config/user.js');
var Contacts = require('../config/contacts.js')
var Q = require('q')
var contactsDB = require('../config/phoneNumbers');
var client = require('./sendMessage');

var findUser = Q.nbind(User.findOne, User); // Promisify the models using Q Promise library
var findContacts = Q.nbind(Contacts.find, Contacts);


var sendText = function(req, res, next) {
  var userId, userPhone
  var username = req.body.username;
  var contactType = req.body.contactType;
  
  var phoneNumber = [];
  findUser({username: username})
    .then(function(user) {
      userId = user._id;
      userPhone = user.phone;
      findContacts({contactOf: userId})
        .then(function (contacts){
          contacts.forEach(function(contact) {
            if(contact.contactType.indexOf(contactType) !== -1){
              phoneNumber.push(contact.phoneNumber);
            }
          })
        })
    })
    if (phoneNumber.length === 0){
      res.send('No contacts in list')
    } else {
      var message = username + " wants your help. Please get in touch with them at "+ userPhone;
      phoneNumber.map(function(phoneNum) {
        client.messages.create({ 
          to: phoneNum, 
          from: "+19199071778", 
          body: message,   
        }, function(err, message) { 
          message ? console.log(message.sid) : void 0;
          err ? console.log('error sending message: ', err) : void 0;
          res.send(message || err);
        });
      })
    }
};

var sendNow = function (req, res, next) {
  contactsDB.map(function(contact) {
    client.messages.create({ 
      to: contact.phone, 
      from: "+19199071778", 
      body: "From your friendly neighborhood spammer",   
    }, function(err, message) { 
      message ? console.log("Message sent, id: ", message.sid) : void 0;
      err ? console.log('error sending message: ', err) : void 0;
    });
  })
  res.send('Message sent');
}


module.exports = {
  sendText: sendText,
  sendNow: sendNow
}