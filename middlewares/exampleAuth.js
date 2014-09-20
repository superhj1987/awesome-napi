var auth = require('./auth');
var securityService = require('../services/SecurityService');

var authInstance = new auth(securityService);

exports.tokenRequired = function(req, res, next){
  authInstance.tokenRequired(req,res,next);
}

exports.authorizationRequired = function(req, res, next){
  authInstance.authorizationRequired(req,res,next);
}

exports.blockUser = function(){
  return authInstance.blockUser();
}