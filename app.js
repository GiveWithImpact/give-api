// Load app config file
var config = require(__dirname + '/data/config');
var api_url = '/api/v' + config.apiVersion;
var version_dir = __dirname + '/v' + config.apiVersion;

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

// Setup auth middleware for auth router
var authMiddleware = require(__dirname + '/middleware/auth');
authApiRouter.use(authMiddleware);

// Load controllers
var authApi = require(version_dir + '/controllers/authApi');
var testApi = require(version_dir + '/controllers/testApi');
var usersApi = require(version_dir + '/controllers/usersApi');

// Enable logging
server.use(morgan('dev'));

// Implement auth API
apiRouter.get('/auth/hash/:username/:password', authApi.getPasswordHash);
apiRouter.post('/auth/login', authApi.login);
authApiRouter.get('/auth/logout', authApi.logOut);
authApiRouter.get('/auth/test', authApi.test);

// Implement simple ping test
apiRouter.get('/test/ping', testApi.getPing);
apiRouter.get('/test/health', testApi.getHealth);

// Define routes for Users API
authApiRouter.get('/users', usersApi.findAll);
authApiRouter.get('/user/:id', usersApi.findById);
authApiRouter.post('/user', usersApi.addOne);
authApiRouter.put('/user/:id', usersApi.updateOne);
authApiRouter.delete('/user/:id', usersApi.deleteOne);

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