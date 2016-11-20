var bodyParser = require('body-parser');


var app = function (app, express) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  console.log('dirname   : ' +__dirname )
  app.use(express.static(__dirname + '/../../client'));
};

module.exports = app;
