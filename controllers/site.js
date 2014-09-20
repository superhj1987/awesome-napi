/**
 * Module dependencies.
 */

exports.index = function (req, res, next) {
	res.send("awesome api"); 
};

exports.tokenExample = function(req, res, next){
	res.send("token example");
}

exports.authorizationExample = function(req, res, next){
	res.send("authorization example");
}
