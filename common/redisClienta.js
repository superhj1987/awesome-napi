var fs = require('fs');
var path = require('path');
var redis = require("redis");
var logger = require('log4js').getLogger();
var config = require('../config').config;

var redisConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/redis.json')));
redisConfig = redisConfig[config.env];
	
logger.debug('init redis');

module.exports = redis.createClient(redisConfig.port,redisConfig.host);