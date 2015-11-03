/*
 Standard CRUD Controller for the Users module
 config and models should be passed in to constructor
 */
module.exports = function ( config, models ) {

	// Users service and model
	var UsersService = require(__dirname + '/../services/users')(config, models);

	return {

		// Get a single record by Id
		findById: function ( req, res, next ) {

			// Check that the current user is an admin
			if (req.user.user_type_id != UsersService.userTypes.Admin.id){
				return res.status(401).send('Unauthorized.');
			}

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
		},

		// Return all Users by search query
		findAll: function ( req, res, next ) {

			// Check that the current user is an admin
			if (req.user.user_type_id != UsersService.userTypes.Admin.id){
				return res.status(401).send('Unauthorized.');
			}

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

		},

		// Create a single new record
		addOne: function ( req, res, next ) {

			// Check that the current user is an admin
			/*if (req.user.user_type_id != UsersService.userTypes.Admin.id){
				return res.status(401).send('Unauthorized.');
			}*/

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

		},

		// Update a single record
		updateOne: function ( req, res, next ) {

			// Construct our update user
			var User = req.body;
			User.id = req.params.id;

			// Check that the current user is an admin
			if (req.user.user_type_id != UsersService.userTypes.Admin.id){
				return res.status(401).send('Unauthorized.');
			}

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

		},

		// Update the profile for the current user
		updateOwnProfile: function ( req, res, next ) {

			// Construct our update user
			var Profile = req.body;
			var user_id = req.user.id;

			// Find our user
			UsersService.findById(user_id).then(
				function ( User ) {

					// Update the profile
					User.profile = JSON.stringify(Profile);

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

				},
				function ( Error ) {
					return res.status(Error.code).send(Error.message);
				}
			);

		},

		// Delete a single record
		deleteOne: function ( req, res, next ) {

			// Check that the current user is an admin
			if (req.user.user_type_id != UsersService.userTypes.Admin.id){
				return res.status(401).send('Unauthorized.');
			}

			// Delete the user
			UsersService.delete(req.params.id).then(
				function ( record ) {
					res.status(200).send(record);
				},
				function ( Error ) {
					res.status(Error.code).send(Error.message);
				}
			);

		}

	};

};

