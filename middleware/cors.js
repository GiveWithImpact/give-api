/*
 Custom CORS middleware, adding support for chrome + localhost
 */
var config = require(__dirname + '/../data/config');

// The middleware function - set the appropriate cors headers
// and response to pre-flight requests
module.exports = function ( server ) {

	// Set global CORS headers
	server.all("/*", function ( req, res, next ) {
		res.header("Access-Control-Expose-Headers", "Location");
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
		return next();
	});

	// Handle pre-flight requests
	server.options("/*", function ( req, res, next ) {
		return res.send(204);
	});

};