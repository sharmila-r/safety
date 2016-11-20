var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "localert"
// mongoose.connect('mongodb://localhost/localert');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(8080);

// export our app for testing and flexibility, required by index.js
module.exports = app;
