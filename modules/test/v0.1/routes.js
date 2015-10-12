/*
	Initialise routing for the Test module
 */
module.exports = function(router, authRouter){

	/*
	 Version 0.1
	 */
	var controller = require(__dirname + '/controllers/test.js')();

	// Implement simple ping test - non authenticated
	router.get('/v0.1/test/ping', controller.getPing);

	// Implement a full health check - authenticated
	authRouter.get('/v0.1/test/health', controller.getHealth);

};