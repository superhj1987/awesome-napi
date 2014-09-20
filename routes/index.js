 var site = require('../controllers/site');

 module.exports = function (app) {
 	app.get('/', site.index);

  	app.get('*', function(req, res){
  		res.send(404,"opps!!!");
	});
};