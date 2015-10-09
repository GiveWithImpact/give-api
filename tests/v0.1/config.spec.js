var config = require('../../data/config.js');

describe ('Test for application configuration file', function(){

	it ('should return the correct application secret', function(){
		expect (config.app_secret).toBeDefined();
		expect (config.app_secret).toBe('sdjhw78wjhbfwijhg76wgahebc67');
	});

});