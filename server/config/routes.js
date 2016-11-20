var userHandler = require('../handlers/userHandler.js');
var messageHandler = require('../handlers/messageHandler.js');
var utils = require('../handlers/utils.js'); 


var app = function (app, express) {
  app.get('/*', express.static(__dirname + '../../client/*'));
  app.post('/api/users/signin', userHandler.signin);
  app.post('/api/users/signup', userHandler.signup);
  app.get('/api/users/signedin', userHandler.checkAuth);

  app.use('/api/sendalert', utils.decode); // add user to req by decoding jwt
  app.post('/api/sendalert', messageHandler.sendNow);
  app.post('/api/contacts', userHandler.addContact)
  app.get('/api/contacts', userHandler.showContacts)

 // handle as error for any other routes
  app.use(utils.errorLogger);
  app.use(utils.errorHandler);
};


module.exports = app;

