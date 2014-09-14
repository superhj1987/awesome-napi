var util = require('../util/util');
var constant = require('../util/constant');
var logger = require('log4js').getLogger();

var auth =  function(securityService){
  this.securityService = securityService;
}

module.exports = auth;
 
/*
* 验证token
*/
auth.prototype.tokenRequired = function(req,res,next){
  var token = req.get('Token');

  if(!token || !this.securityService.verifyToken(token)){
    util.sendResult(res,constant.CODE_FORBIDDEN,'','token error');
    return;
  }

  next();
}

/*
*验证登录
*/
auth.prototype.authorizationRequired = function(req,res,next){
  var authorization = req.get('Authorization');
  
  this.securityService.verifyAuthorization(authorization,function(err,account){
    if(!account){
      util.sendResult(res,constant.CODE_AUTH_ERROR,'','Authorization error');
      return;
    }

    req.account = account;

    next();
  });
}

/**
* 屏蔽用户
*/
auth.prototype.blockUser = function () {
  return function (req, res, next) {
    next();
  };
}