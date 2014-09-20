/**
 * Module dependencies.
 */

//require('newrelic');

var path = require('path');
var fs = require('fs');
var express = require('express');
var errorHandler = require('errorhandler');
var _ = require('lodash');
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
app.use(require('body-parser')({uploadDir: config.upload_dir}));
app.use(require('method-override')());

webFilter.setFilter(app);

app.use('/public',express.static(staticDir));
require('./models')(app);

app.use(errorHandler({ dumpExceptions: true, showStack: true }));

_.extend(app.locals, {
  config: config
});

// routes
routes(app);

app.listen(config.port, function () {
  console.log("Server listening on port %d in %s mode", config.port, app.settings.env);
});

module.exports = app;