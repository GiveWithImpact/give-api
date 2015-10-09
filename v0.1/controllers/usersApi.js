/*
 Implement routes for the /education/tutorials api
 */

// Libraries
var config = require(__dirname + '/../../data/config');
var utils = require(__dirname + '/../../utils');
var models = require(__dirname + '/../models/index');
var UsersService = require(__dirname + '/../services/users');
var Users = models.Users;

// Get a single record by Id
module.exports.findById = function ( req, res, next ) {
	UsersService.findById(req.params.id).then(
		function ( record ) {
			res.status(200).send(
				UsersService.cleanUser(record)
			);
		},
		function ( Error ) {
			return res.status(Error.code).send(Error.message);
		}
	);
};

// Return all Users by search query
module.exports.findAll = function ( req, res, next ) {

	// Build query
	var offset = parseInt(req.query.offset || 0);
	var limit = parseInt(req.query.limit || config.maxRecords);
	var query = req.query.q;

	UsersService.findAll(query, limit, offset).then(
		function ( data ) {

			// Clean records
			var records = [];
			data.records.forEach(function ( record ) {
				records.push(UsersService.cleanUser(record));
			});
			data.records = records;

			res.status(200).send(data);
		},
		function ( Error ) {
			return res.status(Error.code).send(Error.message);
		}
	);

};

// Create a single new record
module.exports.addOne = function ( req, res, next ) {

	// Attempt to create the user record
	UsersService.create(req.body).then(
		function ( User ) {
			res.setHeader('Location', '/user/' + User.id);
			return res.status(201).send(UsersService.cleanUser(User));
		},
		function ( Error ) {
			return res.status(Error.code).send(Error.message);
		}
	);

};

// Update a single record
module.exports.updateOne = function ( req, res, next ) {

	// Construct our update user
	var User = req.body;
	User.id = req.params.id;
	User.organisation_id = config.default_organisation_id;

	// Save the changes
	UsersService.save(User).then(
		function ( record ) {
			res.setHeader('Location', '/user/' + record.id);
			res.status(200).send(record);
		},
		function ( Error ) {
			res.status(Error.code).send(Error.message);
		}
	);

};

// Delete a single record
module.exports.deleteOne = function ( req, res, next ) {

	// Delete the user
	UsersService.delete(req.params.id).then(
		function ( record ) {
			res.status(200).send(record);
		},
		function ( Error ) {
			res.status(Error.code).send(Error.message);
		}
	);

};

