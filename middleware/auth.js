/*
 Authentication middleware to verify the JWT token
 */
var config = require(__dirname + '/../data/config');
var jwt = require("jsonwebtoken");
var UsersService = require(__dirname + '/../v0.1/services/users');

// For the demo - allow the use of a simple API token
module.exports = function ( req, res, next ) {

	// Check for the auth token
	var token = req.body.token || req.query.token || req.headers['authorization'];

	// Do we have a token, any token?
	if ( token ) {

		// Check if it is the 'guest' application token
		if ( token === config.appToken ) {

			console.log('Guest auth token accepted: ' + token);
			return next();

		} else {

			// Verify the token
			jwt.verify(token, config.app_secret, function ( error, decoded ) {
				if ( error ) {

					// Nope - bad token
					return res.status(401).send('Unauthorised - token expired.');

				} else {

					// Check if logged out
					UsersService.findByToken(token).then(
						function(user){

							// Everything is good, send to client for use in other routes
							console.log('User auth token accepted: ' + token);
							var user = jwt.decode(token);
							return next();

						},
						function(error_code, error_message){
							// Ignore actual error - dont give too much away
							console.log('Error locating user token "' + token + '": ' + error_message);
							return res.status(401).send('Unauthorized');
						}
					);

				}
			});

		}

	} else {

		// No token?
		return res.status(401).send('Unauthorised.');

	}

};