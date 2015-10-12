/*
	Sequelize ORM Model loader for Users module
 */

module.exports = function(config){

	// Load models
	var models = [ 'Users' ];
	var Models = {};
	models.forEach(function(model) {
		Models[model] = config.sequelize.import(__dirname + '/' + model.toLowerCase());
	});

	// Describe relationships
	(function(m) {

		/*m.Underlyings.classMethods = {
		 associate:function(m){
		 m.hasMany(m.Underlyings_Prices,{foreignKey: 'underlying_id'})
		 }
		 }*/

	})(Models);

	// Export connection
	Models.sequelize = config.sequelize;

	// Utility to parse sequelize error- extract only the first.. log the rest
	Models.parseError = function(SequelizeError){
		if (SequelizeError.errors.length > 0){
			return SequelizeError.errors[0].message;
		} else {
			return SequelizeError.message;
		}
		return false;
	};

	return Models;

};