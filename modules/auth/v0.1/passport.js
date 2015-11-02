/*
 Passportjs auth strategies

 Login uses the local username/password auth strategy
 Authentication is done via the JWT bearer token auth strategy

 */
module.exports = function ( config, server ) {

	// Libraries and references
	var jwt = require("jsonwebtoken");
	var models = require(__dirname + '/../../users/v0.1/models/index')(config);
	var UsersService = require(__dirname + '/../../users/v0.1/services/users')(config, models);
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var BearerStrategy = require('passport-http-bearer').Strategy;

	// Setup the passport middleware
	server.use(passport.initialize());

	// Local login strategy
	passport.use('local-login', new LocalStrategy(
		function(username, password, done) {

			UsersService.findByUserName(username).then(
				function ( user ) {

					// Verify the password
					var hash = UsersService.createPasswordHash(username, password);
					if ( hash !== user.password_hash ) {
						return done(null, false, { message: 'Incorrect password.' });
					}

					// Create a JWT auth token
					user.token = null;
					user.token = jwt.sign(user, config.Auth.app_secret, {
						expiresIn: config.Auth.auth_token_expiry_mins * 60
					});

					// Save the token
					UsersService.save(user).then(
						function ( User ) {

							// Send back a filtered user object (with token)
							return done(null, UsersService.cleanAuthUser(User));

						},
						function ( Error ) {

							// Ignore actual error - dont give too much away
							console.log('Error updating user "' + username + '"', Error);
							return done(null, false, Error);

						}
					);

				},
				function ( Error ) {

					// Ignore actual error - dont give too much away
					console.log('Error locating user "' + username + '"', Error);
					return done(null, false, Error);

				}
			);

		}
	));

	// Local bearer authorization strategy
	passport.use('local-bearer', new BearerStrategy(
		function(token, done){

			UsersService.findByToken(token).then(
				function ( user ) {
					return done(null, UsersService.cleanAuthUser(user), { scope: 'all' });
				},
				function ( Error ) {

					// Ignore actual error - dont give too much away
					console.log('Error locating access token "' + token + '"', Error);
					return done(null, false);

				}
			);

		}
	));

	return passport;

};


