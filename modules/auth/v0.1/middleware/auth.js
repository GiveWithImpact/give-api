/*
 Authentication middleware to verify the JWT token
 */
module.exports = function(config, models){

	var jwt = require("jsonwebtoken");
	var UsersService = require(__dirname + '/../../../users/v0.1/services/users')(config, models);

	return {

		// Export the routing function for use with as express middleware
		middleware: function ( req, res, next ) {

			// Check for the auth token
			var token = req.body.token || req.query.token || req.headers['authorization'];

			// Do we have a token, any token?
			if ( token ) {

				// Check if it is the 'guest' application token
				if ( token === config.Auth.appToken ) {

					console.log('Guest auth token accepted: ' + token);
					return next();

				} else {

					// Verify the token
					jwt.verify(token, config.Auth.app_secret, function ( error, decoded ) {
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

		}

	};

};
