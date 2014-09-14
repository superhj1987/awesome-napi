var constant = require('./constant');
var numberUtil = require('./numberUtil');
var utility = require('utility');

var utils = module.exports;

/**
 * Check and invoke callback function
 */
utils.invokeCallback = function(cb) {
  if(!!cb && typeof cb === 'function') {
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
  }
};

/**
 * clone an object
 */
utils.clone = function(origin) {
  if(!origin) {
    return;
  }

  var obj = {};
  for(var f in origin) {
    if(origin.hasOwnProperty(f)) {
      obj[f] = origin[f];
    }
  }
  return obj;
};

utils.size = function(obj) {
  if(!obj) {
    return 0;
  }

  var size = 0;
  for(var f in obj) {
    if(obj.hasOwnProperty(f)) {
      size++;
    }
  }

  return size;
};

utils.getAverage = function(numArray){
  if(!(numArray instanceof Array) || (numArray.length <= 0)){
    return 0;
  }

  var total = 0;
  var i;
  for(i = 0;i < numArray.length;i++){
    total = total.add(numArray[i]);
  }

  return total.div(numArray.length);
}

utils.randomNextInt = function(n) {
  var value = Math.random();
  return Math.floor(value * n);
};

utils.formatArgs = function(str){
  return '\"' + str + '\"';
};

utils.convertToNumAvoidNaN = function(val) {
  var i = parseInt(val);
  return isNaN(i) ? 0 : i;
}

utils.convertToFloatAvoidNaN = function(val) {
  var i = parseFloat(val);
  return isNaN(i) ? 0 : i;
};

utils.md5 = function(src){
  return utility.md5(src);
}

utils.getRemoteIp = function(req){
  var ip = req.headers['awesome-real-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
  if(!ip){
    ip = req.connection.remoteAddress;
  }

  return ip;
}

utils.sendOkResult = function(res,result){
   this.sendResult(res,constant.CODE_SUCCESS,result,'');
}

utils.sendListResult = function(res, list, total){
  var ret = {
    list : list,
    total : total
  };
  
  this.sendOkResult(res, ret);
}

utils.sendFailureResult = function(res,err){
   this.sendResult(res,constant.CODE_FAILURE,'',err);
}

utils.sendInnerErrorResult = function(res){
   this.sendResult(res,constant.CODE_INNER_ERROR,'','内部服务器错误');
}

utils.sendResult = function(res,code,result,message){
   res.send(code,{
    code:code,
    result:result,
    message:message
   });
}

exports.format_date = function (date, friendly) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (friendly) {
    var now = new Date();
    var mseconds = -(date.getTime() - now.getTime());
    var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
    if (mseconds < time_std[3]) {
      if (mseconds > 0 && mseconds < time_std[1]) {
        return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
      }
      if (mseconds > time_std[1] && mseconds < time_std[2]) {
        return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
      }
      if (mseconds > time_std[2]) {
        return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
      }
    }
  }

  //month = ((month < 10) ? '0' : '') + month;
  //day = ((day < 10) ? '0' : '') + day;
  hour = ((hour < 10) ? '0' : '') + hour;
  minute = ((minute < 10) ? '0' : '') + minute;
  second = ((second < 10) ? '0': '') + second;

  var thisYear = new Date().getFullYear();
  year = (thisYear === year) ? '' : (year + '-');
  return year + month + '-' + day + ' ' + hour + ':' + minute;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function (html) {
  var codeSpan = /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm;
  var codeBlock = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
  var spans = [];
  var blocks = [];
  var text = String(html).replace(/\r\n/g, '\n')
  .replace('/\r/g', '\n');

  text = '\n\n' + text + '\n\n';

  text = text.replace(codeSpan, function (code) {
    spans.push(code);
    return '`span`';
  });

  text += '~0';

  return text.replace(codeBlock, function (whole, code, nextChar) {
    blocks.push(code);
    return '\n\tblock' + nextChar;
  })
  .replace(/&(?!\w+;)/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/`span`/g, function () {
    return spans.shift();
  })
  .replace(/\n\tblock/g, function () {
    return blocks.shift();
  })
  .replace(/~0$/, '')
  .replace(/^\n\n/, '')
  .replace(/\n\n$/, '');
};