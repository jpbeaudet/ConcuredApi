// Concured API
// =============================================================================
// Concured API to interact with Mongodb collections
// Author : Jean-Philippe beaudet @s3r3nity
//
// All GET and POST reqesut to db and some ordering per date/cscore
// to populate graphs and data in views on needed basis
//
// main: server.js
//
// Concured-api server
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config'); // get our config file
var logger = require('morgan');
app.use(logger('dev'));

// configure app 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = config.port;    // set our port

// routes
var router = express.Router();              // get an instance of the express Router
require('./router/router')(app, router);

// Start the server
app.listen(port);
console.log('ConcuredApi started on port: ' + port);

