var friends = require('../data/friends.js');


module.exports = function(app){

	// when user visits page, JSON it up!
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	// data input to server by user.
	app.post('/api/friends', function(req, res){

		
		// surver will compare  results against every user in the database. chooses user with the least differences as match
		// pushes  user input/info to the database. 
		//  object holds the "best match". and always updates upon input
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		// POST and PARSE results of the match.
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		// Finds difference of input numbers and of the friends database
		var totalDifference = 0;

		// loops through database possibilities
		for  (var i=0; i< friends.length; i++) {
			console.log(friends[i].name);
			totalDifference = 0;

			//loops the scores of every person in database
			for (var j=0; j< friends[i].scores[j]; j++){

				//the difference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If differences is less then the differences of the current "match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// user input pushed to database
		friends.push(userData);

		// shows JSON object with the user's bestMatch
		res.json(bestMatch);

	});

}