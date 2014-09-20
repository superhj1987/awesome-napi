var Auth = require('./Auth');
var securityService = require('../services/securityService');

var authInstance = new Auth(securityService);

exports.tokenRequired = function(req, res, next){
  authInstance.tokenRequired(req,res,next);
}

exports.authorizationRequired = function(req, res, next){
  authInstance.authorizationRequired(req,res,next);
}

exports.blockUser = function(){
  return authInstance.blockUser();
}