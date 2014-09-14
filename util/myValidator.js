var util = require('util');
var validator = require('validator');

var MyValidator = validator;

MyValidator.isMobile = function(mobile){
	if(!mobile) return false;

    if(!(/^1[3|4|5|8]\d{9}$/.test(mobile))){
        return false; 
    } 

	return true;
} 

/**
判断用户名是否由汉字、字母、数字、下划线组成
**/
MyValidator.isUserName = function(userName){
	if(!userName) return false;

    if(!(/^[A-Za-z0-9\u4e00-\u9fa5_]+$/.test(userName))){
        return false; 
    } 

	return true;
}

module.exports = MyValidator;