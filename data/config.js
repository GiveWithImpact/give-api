/*
 Application configuration file
 */

// Set this line to the environment you are currently running
exports.environment = 'development'; //'production';

exports.DEBUG = (exports.environment == 'development');

// Secret key used for generating auth tokens
exports.app_secret = 'sdjhw78wjhbfwijhg7sczxcsd6wgahebc67';

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

// API version
exports.apiVersion = '0.1';

// Application token - changing this will mean changing the app token in all apps that use it
exports.appToken = 'sdjhw78wkshdbfasd78687jhbfwijhg76wgahebc67';
exports.auth_token_expiry_mins = 60 * 4; // 4 Hours

// Max records to be returned by a GET-all-records call
exports.maxRecords = 100;

// Default organisation id
exports.default_organisation_id = 101;