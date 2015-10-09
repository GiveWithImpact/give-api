/*
 Implement routes for the /auth api
 */

// Libraries
var config = require(__dirname + '/../../data/config');
var jwt = require("jsonwebtoken");
var UsersService = require(__dirname + '/../services/users');
var models = require(__dirname + '/../models/index');

// Get a password hash
module.exports.getPasswordHash = function ( req, res ) {
	res.send(200, UsersService.createPasswordHash(req.params.username, req.params.password));
};

// Log our the current session
module.exports.logOut = function ( req, res ) {

	var token = req.body.token || req.query.token || req.headers['authorization'];

	UsersService.findByToken(token).then(
		function(user) {

			// Invalid the token
			user.token = null;
			user.iat = null;
			user.exp = null;

			// Save the user record
			UsersService.save(user).then(
				function () {
					res.send(200, 'OK');
				},
				function ( error ) {
					console.log('Auth error', error);
					next(new Error('Unable to invalidate users token: ' + error.message));
				}
			);

		},
		function ( Error ) {
			return res.status(Error.code).send(Error.message);
		}
	);
};

// Perform a login action - issue a JWT token
module.exports.login = function ( req, res, next ) {

	// Attempt to locate the users record
	var username = req.body.username;
	var password = req.body.password;

	UsersService.findByUserName(username).then(
		function ( user ) {

			// Verify the password
			var hash = UsersService.createPasswordHash(username, password);
			if ( hash !== user.password_hash ) {
				return res.status(401).send('Unauthorized');
			}

			// Create a JWT auth token
			user.token = null;
			user.token = jwt.sign(user, config.app_secret, {
				expiresInMinutes: config.auth_token_expiry_mins
			});

			// Save the token
			UsersService.save(user).then(
				function ( User ) {

					// Send back a filtered user object (with token)
					return res.json(200, UsersService.cleanAuthUser(User));

				},
				function ( Error ) {

					// Ignore actual error - dont give too much away
					console.log('Error updating user "' + username + '"', Error);
					return res.status(401).send('Unauthorized');

				}
			);

		},
		function ( Error ) {

			// Ignore actual error - dont give too much away
			console.log('Error locating user "' + username + '"', Error);
			return res.status(401).send('Unauthorized');

		}
	);

};

// Test for authentication - should be protected via auth middleware
module.exports.test = function ( req, res, next ) {

	res.json(200, 'You are authenticated!');

};

