var logger = require('log4js').getLogger();
var util = require('../util/util');


var WebFilter = {};

WebFilter.setFilter = function(app){
  app.use(errorFilter);
  app.use(loggerFilter);
};

function errorFilter(err, req, res, next){
  console.warn(err.stack);
  res.send(500, 'server error!');
}

function loggerFilter(req, res, next){
  if(!!req.get("token") || !!req.get("Authorization")){
    logger.info('client ip ：', util.getRemoteIp(req));
  	logger.debug('request logger, method : %j, url : %j', req.method, req.url);
  	logger.debug(req.body);
  }

  next();
}

module.exports = WebFilter