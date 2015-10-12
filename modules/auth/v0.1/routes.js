/*
 Version 0.1 Auth module routes
 */

var _ = require('lodash');

// Module config
var config = require(__dirname + '/../../../data/config');
config.Auth = require(__dirname + '/config');
config.Users = require(__dirname + '/../../users/v0.1/config');

// Module controllers - attach config and model constructor
var models = {};
var userModels = require(__dirname + '/../../users/v0.1/models/index')(config);
models = _.assign(models, userModels);
var controller = require(__dirname + '/controllers/auth.js')(config, models);

// Module routes constructor
module.exports = function ( router, authRouter ) {

	// Auth routes
	router.get('/v0.1/auth/hash/:username/:password', controller.getPasswordHash);
	router.post('/v0.1/auth/login', controller.login);
	authRouter.get('/v0.1/auth/logout', controller.logOut);
	authRouter.get('/v0.1/auth/test', controller.test);

};