/*
    Version 0.1 Test module
 */
module.exports = function( config, server, router, models ){

	/*
	 Version 0.1
	 */
	var passport = require(__dirname + '/../../auth/v0.1/passport')(config, server);
	var controller = require(__dirname + '/controllers/test.js')(config, models);

	// Implement simple ping test - non authenticated
	router.get('/v0.1/test/ping', controller.getPing);

	// Implement a full health check - authenticated
	router.get('/v0.1/test/health', passport.authenticate('local-bearer', { session: false }), controller.getHealth);

};