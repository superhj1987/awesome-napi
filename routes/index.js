 var site = require('../controllers/site');
 var auth = require('../middlewares/exampleAuth');

 module.exports = function (app) {
 	app.get('/', site.index);

 	app.get('/tokenExample', auth.tokenRequired, site.tokenExample);

 	app.get('/authorizationExample', auth.authorizationRequired, site.authorizationExample);

  	app.get('*', function(req, res){
  		res.send(404,"opps!!!");
	});
};