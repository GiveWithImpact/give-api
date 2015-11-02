/*
 Version 0.1 Auth module routes
 */

// Module routes constructor
module.exports = function ( config, router, models, passport ) {

	var UsersService = require(__dirname + '/../../users/v0.1/services/users')(config, models);

	// Login
	router.post(
		'/v0.1/auth/login',
		function(req, res, next) {
			passport.authenticate('local-login', function(err, user, info) {

				res.header("Access-Control-Expose-Headers", "Location");
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
				res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");

				if (err) {
					return next(err); // will generate a 500 error
				}

				// Return user if found
				if (!user) {
					return res.send(401);
				} else {
					return res.json(200, user);
				}

			})(req, res, next);
		}
	);

	// Auth test
	router.get(
		'/v0.1/auth/test',
		passport.authenticate('local-bearer', { session: false }),
		function(req, res) {
			return res.json(200, req.user);
		}
	);

	// Create a hash
	router.get(
		'/v0.1/auth/hash/:username/:password',
		passport.authenticate('local-bearer', { session: false }),
		function(req, res, next){

			return res.send(200, UsersService.createPasswordHash(
				req.params.username, req.params.password
			));

		}
	);

	// Logout
	router.get(
		'/v0.1/auth/logout',
		passport.authenticate('local-bearer', { session: false }),
		function(req, res, next){

			UsersService.findByToken(req.user.token).then(
				function ( user ) {

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

		}
	);

};