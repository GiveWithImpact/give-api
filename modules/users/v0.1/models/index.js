/*
	Sequelize ORM Model loader for Users module
 */

module.exports = function(config){

	var Sequelize = require('sequelize');

	// Initialize database connection
	var sequelize = new Sequelize(
		config.database.dbname,
		config.database.user,
		config.database.password,
		{
			host: config.database.host,
			dialect: 'mysql',
			pool: {
				max: 100,
				min: 0,
				idle: 10000
			},
			logging: (config.DEBUG ? console.log : false)
		}
	);

	// Load models
	var models = [ 'Users' ];
	var Models = {};
	models.forEach(function(model) {
		Models[model] = sequelize.import(__dirname + '/' + model.toLowerCase());
	});

	// Describe relationships
	(function(m) {

		/*m.Underlyings.classMethods = {
		 associate:function(m){
		 m.hasMany(m.Underlyings_Prices,{foreignKey: 'underlying_id'})
		 }
		 }*/

	})(Models);

	// Sync new models
	sequelize.sync();

	// Export connection
	Models.sequelize = sequelize;

	// Utility to parse sequelize error- extract only the first.. log the rest
	Models.parseError = function(SequelizeError){
		if (SequelizeError.errors.length > 0){
			return SequelizeError.errors[0].message;
		}
		return false;
	};

	return Models;

};