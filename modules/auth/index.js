/*
 Auth Module
 */

var _ = require('lodash');

// Singleton constructor for Auth API module
var theModule = {};
module.exports = theModule;

/*
 Privates
 */
var passport;

/*
 Public interface
 */

// Initialise routing
theModule.initPassport = function ( server ) {

	/*
		Version 0.1
	 */
	var config = require(__dirname + '/../../data/config');
	config.Auth = require(__dirname + '/v0.1/config');
	passport = require(__dirname + '/v0.1/passport')(config, server);

};

// Initialise routing
theModule.initRoutes = function ( router ) {

	/*
	 Version 0.1
	 */
	var config = require(__dirname + '/../../data/config');
	config.Auth = require(__dirname + '/v0.1/config');
	var models = {};
	var userModels = require(__dirname + '/../users/v0.1/models/index')(config);
	models = _.assign(models, userModels);
	require(__dirname + '/v0.1/routes')(config, router, models, passport);

};
