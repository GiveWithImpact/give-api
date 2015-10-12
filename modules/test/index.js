/*
	Test Module
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
theModule.initRoutes = function ( router, authRouter ) {

	/*
		Version 0.1
	 */
	require(__dirname + '/v0.1/routes')(router, authRouter);

};
