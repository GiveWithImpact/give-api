/*
 Version 0.1 Users module routes
 */

// Module routes constructor
module.exports = function ( config, server, router, models ) {

	/*
		Version 0.1
	 */
	var passport = require(__dirname + '/../../auth/v0.1/passport')(config, server);
	var crudController = require(__dirname + '/controllers/crud.js')(config, models);

	// Allow a user to update their own profile
	router.put('/v0.1/user/me', passport.authenticate('local-bearer', { session: false }), crudController.updateOwnProfile);

	// Standard CRUD routes
	router.get('/v0.1/users', passport.authenticate('local-bearer', { session: false }), crudController.findAll);
	router.get('/v0.1/user/:id', passport.authenticate('local-bearer', { session: false }), crudController.findById);
	router.post('/v0.1/user', passport.authenticate('local-bearer', { session: false }), crudController.addOne);
	router.put('/v0.1/user/:id', passport.authenticate('local-bearer', { session: false }), crudController.updateOne);
	router.delete('/v0.1/user/:id', passport.authenticate('local-bearer', { session: false }), crudController.deleteOne);

	// Aliases
	router.post('/v0.1/account/registration', passport.authenticate('local-bearer', { session: false }), crudController.addOne);

};