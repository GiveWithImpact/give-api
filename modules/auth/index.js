/*
 Auth Module
 */

// Singleton constructor for Auth API module
var theModule = {};
module.exports = theModule;

/*
 Privates
 */


/*
 Public interface
 */

// Initialise routing
theModule.initRoutes = function ( router, authRouter ) {

	/*
	 Version 0.1
	 */

	// Module config
	var config = require(__dirname + '/../../data/config');
	config.Auth = require(__dirname + '/v0.1/config');

	// Setup auth middleware for auth router
	var userModels = require(__dirname + '/../users/v0.1/models/index')(config);
	var authMiddleware = require(__dirname + '/v0.1/middleware/auth')(config, userModels);
	authRouter.use(authMiddleware.middleware);

	// Routes
	require(__dirname + '/v0.1/routes')(router, authRouter);

};
