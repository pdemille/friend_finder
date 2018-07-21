var path = require('path');

module.exports = function(app){

	//the app.gets below are for the html webpages

	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}