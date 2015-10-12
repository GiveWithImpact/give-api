/*
 Users Service
 */

module.exports =  function(config, models){

	var crypto = require('crypto');
	var jwt = require("jsonwebtoken");
	var Promise = require("bluebird");
	var Users = models.Users;

	var UsersService = {

		// List of user types
		userTypes: {
			Admin  : {
				id: 1, label: 'Administrator'
			},
			Donor  : {
				id: 2, label: 'Donor'
			},
			Charity: {
				id: 3, label: 'Charity'
			}
		},
		user_type_ids: [1, 2, 3],

		// Create a password hash
		createPasswordHash: function ( username, password ) {

		// In php equivalent to:
		/*
		 sha1(sha1(password . sha1(username)))
		 */
		var password_hash = crypto.createHash('sha1')
			.update(username).digest("hex");
		password_hash = crypto.createHash('sha1')
			.update(password + password_hash).digest("hex");
		password_hash = crypto.createHash('sha1')
			.update(password_hash).digest("hex");
		return password_hash;

	},

		// Decode a token for the user object
		decodeToken: function ( token ) {
			return new Promise(function ( resolve, reject ) {
				jwt.verify(token, config.app_secret, function ( error, decoded ) {
					if ( error ) {
						return reject({ code: 500, message: error });
					} else {
						resolve(jwt.decode(token));
					}
				});
			});
		},

		// Get a single record by Id
		findById: function ( id ) {
			return new Promise(function ( resolve, reject ) {
				Users.findById(id).then(function ( record ) {
					if ( record ) {
						resolve(record);
					} else {
						return reject({ code: 404, message: 'Not found' });
					}
				});
			});
		},

		// Find a user record by username
		findByUserName: function ( username ) {
			return new Promise(function ( resolve, reject ) {
				Users.findAll({
					where: {
						email: username
					}
				}).then(function ( records ) {
					if ( records && records.length > 0 ) {
						resolve(records[0].dataValues);
					} else {
						return reject({ code: 404, message: 'Not found' });
					}
				});
			});
		},

		// Find a user record by token
		findByToken: function ( token ) {
			return new Promise(function ( resolve, reject ) {
				Users.findAll({
					where: {
						token: token
					}
				}).then(function ( records ) {
					if ( records && records.length > 0 ) {
						resolve(records[0].dataValues);
					} else {
						return reject({ code: 404, message: 'Not found' });
					}
				});
			});
		},

		// Find all users by search query - paginated results
		findAll: function ( query, limit, offset ) {
			return new Promise(function ( resolve, reject ) {

				var where = query.length > 0 ? {
					$or: [
						{
							organisation_id: config.Users.default_organisation_id
						},
						{
							name: {
								$like: '%' + query + '%'
							}
						},
						{
							email: {
								$like: '%' + query + '%'
							}
						},
						{
							gcm_reg_code: {
								$like: '%' + query + '%'
							}
						}
					]
				} : {};

				// Get table total
				Users.count().then(function ( total ) {

					// Perform search
					Users.findAndCountAll({
						where : where,
						order : [
							['name', 'ASC']
						],
						offset: offset,
						limit : limit
					}).then(function ( records ) {
						resolve({
							total       : total,
							offset      : offset,
							limit       : limit,
							query       : query,
							filter_total: records.count,
							records     : records.rows
						});
					});

				});

			});
		},

		// Save changes to an existing user record
		save: function ( User ) {
			return new Promise(function ( resolve, reject ) {

				// Validate user type id
				if ( UsersService.user_type_ids.indexOf(parseInt(User.user_type_id)) === -1 ) {
					return reject({ code: 400, message: 'Invalid user type.' });
				}

				// Validate password
				var password_hash;
				if (User.password_hash && User.password_hash.length > 0){
					password_hash = User.password_hash;
				} else {
					if ( User.password.length == 0 ) {
						return reject({ code: 400, message: 'Password not specified.' });
					}
					password_hash = UsersService.createPasswordHash(User.email, User.password);
				}

				// Check unique index
				Users.count({
					where: {
						email          : User.email,
						organisation_id: config.Users.default_organisation_id,
						id             : {
							ne: User.id
						}
					}
				}).then(function ( count ) {
					if ( count > 0 ) {
						return reject({
							code   : 400,
							message: 'Duplicate - this user email already exists for this organisation.'
						});
					} else {

						// Find the record
						Users.findById(User.id).then(function ( record ) {

							if ( record ) {

								// Update the model
								record.name = User.name;
								record.email = User.email;
								record.organisation_id = User.organisation_id;
								record.user_type_id = User.user_type_id;
								record.token = User.token;
								record.gcm_reg_code = User.gcm_reg_code;
								record.password_hash = password_hash;
								record.gcm_reg_code = User.gcm_reg_code;
								record.iat = User.iat;
								record.exp = User.exp;

								// Save to the database
								record.save().then(
									function () {
										resolve(record);
									},
									function ( errors ) {
										return reject({ code: 500, message: models.parseError(errors) });
									}
								);

							} else {
								return reject({ code: 404, message: 'Not found' });
							}
						});

					}
				});

			});
		},

		// Create a new user
		create: function ( User ) {
			return new Promise(function ( resolve, reject ) {

				// Validate user type id
				if ( UsersService.user_type_ids.indexOf(parseInt(User.user_type_id)) === -1 ) {
					return reject({ code: 400, message: 'Invalid user type.' });
				}

				// Validate password
				if ( User.password.length == 0 ) {
					return reject({ code: 400, message: 'Password not specified.' });
				}

				// Check unique index
				Users.count({
					where: {
						email          : User.email,
						organisation_id: config.Users.default_organisation_id
					}
				}).then(function ( count ) {
					if ( count > 0 ) {
						return reject({
							code   : 400,
							message: 'Duplicate - this user email already exists for this organisation.'
						});
					} else {

						// Create the password hash
						var password_hash = UsersService.createPasswordHash(User.email, User.password);

						// Create the model
						Users.create({
							name           : User.name,
							email          : User.email,
							password_hash  : password_hash,
							organisation_id: config.Users.default_organisation_id,
							user_type_id   : User.user_type_id,
							gcm_reg_code   : User.gcm_reg_code
						}).then(
							function ( record ) {

								// Save to the database
								record.save().then(
									function () {
										resolve(record);
									},
									function ( errors ) {
										return reject({ code: 500, message: models.parseError(errors) });
									}
								);
							},
							function ( errors ) {
								return reject({ code: 400, message: models.parseError(errors) });
							}
						);

					}
				});

			});
		},

		// Delete a user
		delete: function ( id ) {
			return new Promise(function ( resolve, reject ) {

				// Find the record
				Users.findById(id).then(function ( record ) {
					if ( record ) {

						record.destroy().then(function () {
							return resolve(record);
						});

					} else {
						return reject({ code: 404, message: 'Not found' });
					}
				});

			});
		},

		// Strip a user record down to client-safe fields
		// cleanAuthUser() includes the token field
		cleanAuthUser: function ( User ) {
			return {
				id             : User.id,
				email          : User.email,
				organisation_id: User.organisation_id,
				user_type_id   : User.user_type_id,
				token          : User.token,
				gcm_reg_code   : User.gcm_reg_code,
				created_at     : User.created_at,
				updated_at     : User.updated_at
			};
		},
		cleanUser: function ( User ) {
			var CleanUser = this.cleanAuthUser(User);
			delete CleanUser.token;
			return CleanUser;
		}

	};

	return UsersService;

};