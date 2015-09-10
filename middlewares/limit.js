var config = require('../config').config;
var redisClient = require('../common/redisClient');
var util = require('../util/util');
var constant = require('../util/constant');
var logger = require('log4js').getLogger();

// 发帖时间间隔，为毫秒
var POST_INTERVAL = config.post_interval;
if (!(POST_INTERVAL > 0)) POST_INTERVAL = 0;
var DISABLE_POST_INTERVAL = POST_INTERVAL > 0 ? false : true;

var LAST_POST_TIMETAG_PREFIX  = 'last_post_timeTag_';

/**
 * 发布间隔限制
 */
exports.postLimit = function (req, res, next) {
  if (DISABLE_POST_INTERVAL) return next();

  var cacheKey = LAST_POST_TIMETAG_PREFIX + req.account.id;

  redisClient.get(cacheKey,function(err,ret){
      if(err){
        logger.error('redis error : ', err);
      }else{
        var timeTag = util.convertToNumAvoidNaN(ret);

        if (Date.now() - timeTag < POST_INTERVAL) {
            var ERROR_MSG = '10秒中内您不能频繁发布。';
            util.sendResult(res,constant.CODE_FORBIDDEN,'',ERROR_MSG);
            return;
        }
      }

      redisClient.set(cacheKey,Date.now());//这里可以使用设置超时时间来控制频率
      next();
  });
};

// 发送短信间隔，为毫秒
var SEND_INTERVAL = config.send_interval;
if (!(SEND_INTERVAL > 0)) SEND_INTERVAL = 0;
var DISABLE_SEND_INTERVAL = SEND_INTERVAL > 0 ? false : true;

var LAST_SEND_TIMETAG_PREFIX  = 'last_send_timeTag_';

/*
发送频率限制
*/
exports.sendLimit = function(req,res,next){
  if (DISABLE_SEND_INTERVAL) return next();

  var cacheKey = LAST_SEND_TIMETAG_PREFIX + util.getRemoteIp(req);

  redisClient.get(cacheKey,function(err, ret){
    var timeTag = util.convertToNumAvoidNaN(ret);
    if(err){
      logger.error('redis error : ', err);
      util.sendInnerErrorResult(res);
    }else if((Date.now() -  timeTag) <=  SEND_INTERVAL){
      util.sendResult(res,constant.CODE_FORBIDDEN,'','访问频率超限');
    }else{
      redisClient.set(cacheKey, Date.now());//这里可以使用设置超时时间来控制频率
     
      next();
    }

  }); 
}
