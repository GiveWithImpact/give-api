// Load app config file
var config = require(__dirname + '/data/config');
var api_url = '/api';

// Configure routing
var express = require('express');
var apiRouter = express.Router();
var authApiRouter = express.Router();

// Start express router
var server = express();

// Configure the server and request parsing
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var morgan = require('morgan');
server.use(useragent.express());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

// Assign both auth'd and non-auth'd routers
server.use(api_url, apiRouter);
server.use(api_url, authApiRouter);

// Enable CORS
var cors = require(__dirname + '/middleware/cors');
cors(authApiRouter);
cors(apiRouter);

/*
	Load custom modules
 */

// Auth
var AuthModule = require(__dirname + '/modules/auth');
AuthModule.initRoutes(apiRouter, authApiRouter);

// Test
var TestModule = require(__dirname + '/modules/test');
TestModule.initRoutes(apiRouter, authApiRouter);

// Users
var UsersModule = require(__dirname + '/modules/users');
UsersModule.initRoutes(apiRouter, authApiRouter);

// Configure application error handler
server.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(500).send('Server error.');
});

// Start server
server.listen(config.server.port, config.server.host, function () {
	console.log('Using server config: ' + config.environment);
	console.log('Listening on %s:%s ', config.server.host, config.server.port);
});