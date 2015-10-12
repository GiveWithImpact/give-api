/*
	Configuration file for the Auth module
 */

// Secret key used for generating auth tokens
exports.app_secret = 'sdjhw78wjhbfwijhg7sczxcsd6wgahebc67';

// Application token - changing this will mean changing the app token in all apps that use it
exports.appToken = 'sdjhw78wkshdbfasd78687jhbfwijhg76wgahebc67';
exports.auth_token_expiry_mins = 60 * 4; // 4 Hours