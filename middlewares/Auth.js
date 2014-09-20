var util = require('../util/util');
var constant = require('../util/constant');
var logger = require('log4js').getLogger();

var Auth =  function(securityService){
  this.securityService = securityService;
}

module.exports = Auth;
 
/*
* 验证token
*/
Auth.prototype.tokenRequired = function(req,res,next){
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
Auth.prototype.authorizationRequired = function(req,res,next){
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
Auth.prototype.blockUser = function () {
  return function (req, res, next) {
    next();
  };
}