# Give API

## Installation

You will need Node and NPM installed on the machine you wish to run this API on. Once these are installed, 
run `npm install` to install all project dependencies.

Create a database called `givewithimpact`. Database seed file is in `/data/db-seed-givewithimpact.sql`.

### Configuration
In the file `/data/config.js` you will find server and other configuration information. Change this 
to suit your environment.

### Running your app
You can run your app from the command line in the root of the application folder with `node app.js`.

In a server environment you should run the app using a Node process management tool such as PM2.

## Versioning
Version is included in the URI. Current version is **0.1**. Construct a route like this:

`/api/v0.1/[api_route]` E.g.:
`/api/v0.1/customer/2` - GETs a customer record with ID '2'
`/api/v0.1/customers` - GETs all customer record

## Authentication
See the Auth module README.

## Testing
In the root of the repo there is a file called `postman-api-config.json` - this is a collection 
of API calls for the Chrome Postman app. Use this to test the API interface.

[Postman App Download Link] (https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)





    
