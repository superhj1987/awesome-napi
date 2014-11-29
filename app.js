/**
 * Module dependencies.
 */

//require('newrelic');

var path = require('path');
var fs = require('fs');
var express = require('express');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
require('log4js').configure(path.join(__dirname, 'config/log4j.json'),{});

require('./common/redisClient');
var config = require('./config').config;
var routes = require('./routes');
var webFilter = require('./filter/webFilter.js');

var staticDir = path.join(__dirname, 'public');

var app = express();

app.set("env", config.env);

app.use(require('response-time')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('method-override')());

webFilter.setFilter(app);

app.use('/public',express.static(staticDir));
//require('./models')(app);

if(config.debug){
   app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

// routes
routes(app);

app.listen(config.port, function () {
  console.log("Server listening on port %d in %s mode", config.port, app.settings.env);
});

module.exports = app;