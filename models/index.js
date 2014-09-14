var orm = require('orm');
var fs = require('fs');
var path = require('path');
var config = require('../config').config;
var mysqlConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/mysql.json')));
var logger = require('log4js').getLogger();
mysqlConfig = mysqlConfig[config.env];

module.exports = function (app) {
	logger.debug('init models...');
	app.use(orm.express(mysqlConfig, {
    	define: function (db, models, next) {
            
        	next();
    	}
	}));
}