/*
 Version 0.1 Users module routes
 */

// Module config
var config = require(__dirname + '/../../../data/config');
config.Users = require(__dirname + '/config');

// Module controllers - attach config and model constructor
var models = require(__dirname + '/models/index')(config);
var crudController = require(__dirname + '/controllers/crud.js')(config, models);

// Module routes constructor
module.exports = function ( router, authRouter ) {

	// Standard CRUD routes
	authRouter.get('/v0.1/users', crudController.findAll);
	authRouter.get('/v0.1/user/:id', crudController.findById);
	authRouter.post('/v0.1/user', crudController.addOne);
	authRouter.put('/v0.1/user/:id', crudController.updateOne);
	authRouter.delete('/v0.1/user/:id', crudController.deleteOne);

	// Aliases
	authRouter.post('/v0.1/account/registration', crudController.addOne);

};