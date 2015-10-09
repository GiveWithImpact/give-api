/*
	Model loader
 */
var Sequelize = require('sequelize');
var config = require(__dirname + '/../../data/config');

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
var models = [
	'Users'
];
models.forEach(function(model) {
	module.exports[model] = sequelize.import(__dirname + '/' + model.toLowerCase());
});

// Describe relationships
(function(m) {

	/*m.Underlyings.classMethods = {
		associate:function(m){
			m.hasMany(m.Underlyings_Prices,{foreignKey: 'underlying_id'})
		}
	}*/

})(module.exports);

// Sync new models
sequelize.sync();

// Export connection
module.exports.sequelize = sequelize;

// Utility to parse sequelize error- extract only the first.. log the rest
module.exports.parseError = function(SequelizeError){
	if (SequelizeError.errors.length > 0){
		return SequelizeError.errors[0].message;
	}
	return false;
};