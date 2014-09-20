/*
*api权限、安全相关，包括验证token、authorization、生成authToken等
*/

var uuid = require('node-uuid');
var crypto = require('crypto');
var util = require('../util/util');
var utility = require('utility');
var redisClient = require('../common/RedisClient');
var config = require('../config').config;
var logger = require('log4js').getLogger();
var consts = require('../util/constant');

var tokens = ['80451223123121secersb678954'];

var AUTH_TOKEN_PREFIX = 'AuthToken_';

var SecurityService = module.exports;

/*
*验证token
*/
exports.verifyToken = function(token){
  if(!token){
    return false;
  }

	for(var i =0;i < tokens.length; i++){
		if(token == tokens[i]){
			return true;
		}
	}

	return false;
}

exports.generateAuthToken = function(account){
	var token = uuid.v4();
  var cacheKey = AUTH_TOKEN_PREFIX + token;
  redisClient.set(cacheKey,account.id + ':' + account.type);
  redisClient.expire(cacheKey, config.authTokenExpire);

  return token;
}

exports.verifyAuthorization = function(authorization,cb){
  var account  = null;

  if(!!authorization){
    var cacheKey = AUTH_TOKEN_PREFIX + authorization;
    redisClient.get(cacheKey,function(err,acc){
      if(err){
        logger.error('redis error : ', err);
      }else if(!!acc){
        var temp = acc.split(':');
        account = {
          id : temp[0] || '',
          type : temp[1] || ''
        }

        //延长authToken有效期
        redisClient.set(cacheKey,acc);
        redisClient.expire(cacheKey, config.authTokenExpire);
      }
      
      util.invokeCallback(cb,null,account);
    });
  }else{
      util.invokeCallback(cb,null,null);
  }
}

exports.encrptPass = function(md5Password) {
  return utility.md5(md5Password + config.passwordSalt);
}

// private
function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}