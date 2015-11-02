/*
 Users Module
 */

// Singleton constructor for Test API module
var theModule = {};
module.exports = theModule;

/*
 Privates
 */


/*
 Public interface
 */

// Initialise routing
theModule.initRoutes = function ( server, router ) {

	/*
	 Version 0.1
	 */
	var config = require(__dirname + '/../../data/config');
	config.Users = require(__dirname + '/v0.1/config');
	config.Auth = require(__dirname + '/../auth/v0.1/config');
	var models = require(__dirname + '/v0.1/models/index')(config);
	require(__dirname + '/v0.1/routes')(config, server, router, models);

};
