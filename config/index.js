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

  api_version:'v1',
  
  authTokenExpire : 30 * 60 //authToken的过期时间/se 
};

module.exports = config;
module.exports.config = config;