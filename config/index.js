/**
 * config
 */

var path = require('path');
var pkg = require('../package.json');

var config = {
  debug: true,
  env : "development",
  name: 'awesome-api',
  description: '',
  version: pkg.version,

  port: 3000,

  // 发布时间间隔，单位：毫秒
  post_interval: 10000,

  // 发送时间间隔，单位：毫秒
  send_interval: 5 * 60 * 1000,

  api_version:'v1',
  
  authTokenExpire : 30 * 60 //authToken的过期时间/se 
};

module.exports = config;
module.exports.config = config;