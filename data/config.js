/*
 Application configuration file
 */

// Set this line to the environment you are currently running
exports.environment = 'development'; //'production';
exports.DEBUG = (exports.environment == 'development');

/*
 Configure your servers, ports and databases here
 */
switch ( exports.environment ) {
	case 'development':
		exports.server = {
			host: 'localhost',
			port: process.env.PORT || 8085
		};
		exports.database = {
			host    : 'localhost',
			user    : 'givewithimpact',
			password: '6F@cLvgLPa-k6&hz',
			dbname  : 'givewithimpact'
		};
		break;
	case 'staging':
		exports.server = {
			host: '0.0.0.0',
			port: process.env.PORT || 8085
		};
		break;
	case 'production':
		exports.server = {
			host: '0.0.0.0',
			port: process.env.PORT || 8085
		};
		break;
	default:
		throw 'Invalid server configuration.';
}

// Max records to be returned by a GET-all-records call
exports.maxRecords = 100;
