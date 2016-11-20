// Twilio Credentials 
var accountSid = 'AC079e29a06be43fb8c74d3254cbb3fe5d'; 
var authToken = '91fab7859f6f0aaa587769a3adce9785'; 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
// client.messages.create({ 
//   to: "9199176791", 
//   from: "+19199071778", 
//   body: "another message",   
// }, function(err, message) { 
//   message ? console.log(message.sid) : void 0;
//   err ? console.log('error sending message: ', err) : void 0;
// });

module.exports = client;