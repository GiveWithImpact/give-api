// Load app config file
var config = require(__dirname + '/data/config');
var api_url = '/api';

// Configure routing
var express = require('express');
var apiRouter = express.Router();

// Start express router
var server = express();

// Configure the server and request parsing
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var morgan = require('morgan');
server.use(useragent.express());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

// Prep Auth Module
var AuthModule = require(__dirname + '/modules/auth');
AuthModule.initPassport(server);
AuthModule.initRoutes(apiRouter);

// Assign routers
server.use(api_url, apiRouter);

// Enable CORS
var cors = require(__dirname + '/middleware/cors');
cors(apiRouter);

/*
	Load custom modules - pass in server and router objects
 */

// Test
var TestModule = require(__dirname + '/modules/test');
TestModule.initRoutes(server, apiRouter);

// Users
var UsersModule = require(__dirname + '/modules/users');
UsersModule.initRoutes(server, apiRouter);

// Sync data models - after module load to get all models for all modules
config.sequelize.sync();

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