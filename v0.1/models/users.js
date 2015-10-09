/*
 Data model for the Users table
 */

module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define(
		"Users",
		{
			id  : {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING(250),
				allowNull: false
			},
			password_hash: {
				type: DataTypes.STRING(250),
				allowNull: false
			},
			user_type_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			organisation_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			gcm_reg_code: {
				type: DataTypes.STRING(100),
				allowNull: true
			},
			email: {
				type: DataTypes.STRING(250),
				allowNull: false
			},
			token: {
				type: DataTypes.STRING(500),
				allowNull: true
			},
			iat: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			exp: {
				type: DataTypes.INTEGER,
				allowNull: true
			}
		},
		{
			underscored: true,
			indexes: [
				{
					fields: ['token']
				},
				{
					fields: ['organisation_id', 'name', 'email', 'gcm_reg_code']
				},
				{
					fields: ['organisation_id']
				},
				{
					unique: true,
					fields: ['email', 'organisation_id']
				}
			]
		}
	);

	return Users;
};