# Give API

## Installation

You will need Node and NPM installed on the machine you wish to run this API on. Once these are installed, 
run `npm install` to install all project dependencies.

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
Login using either a fixed application token via the `Authorization` header, or obtain a user token 
via the '/auth/login` method which issues a token.  

## Testing
In the root of the repo there is a file called `postman-api-config.json` - this is a collection 
of API calls for the Chrome Postman app. Use this to test the API interface.

[Postman App Download Link] (https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

## Auth API

- GET | `/auth/hash/:username/:password`
	- Generate a sha1 password hash
	
- POST | `/auth/login`
    - form-urlencoded body
    - Params:
        - username
        - password
    - Response Content-type: application/json
    
- GET | `/auth/logout`
	- Requires `Authorization` header
    - Logout / invalid a user token
    - Not necessary for a fixed application token
    
- GET | `/auth/test`
	- Requires `Authorization` header
    - Simply tests an authentication token
   
### The user authentication request flow
 1. Log in using `/auth/login`
 2. The response includes a `token` property.
 3. For all future authenticated requests, include the token as the `Authorization` HTTP header.
 4. When calling `/auth/logout` this call will remove the user token from the user record, 
 therefore preventing access until the user logs in again.
 
### Using the guest app token
The guest app token is used for non-logged in calls, such as `/account/registration`

## Test API
    
- GET | `/test/ping`
	- Does NOT Requires `Authorization` header
    - Returns a 200 status code if the service is online
    - Can be used for monitoring services such as [Pingdom](http://www.pingdom.com)
    - Provides a way of checking overall service availability
    
- GET | `/test/health`
    - Returns a 200 status code if all tests pass
    - Requires `Authorization` header
    - Provides a fuller service check
    - Returns a JSON object containing various service information
    
## Users(s) API

- GET | `/user/:id`
	- Requires `Authorization` header
	- Response Content-type: application/json
	- Gets a single user record
	- Returns a single JSON record object
	
- GET | `/users?q=[search string]&limit=100&offset=0`
	- Requires `Authorization` header
	- Response Content-type: application/json
	- Gets all user records by query
	- Params:
            - q
            - limit
            - offset
	- Returns a JSON object containing pagination information and a list of record objects
	- Searches on name, email and gcm_reg_code fields
	
- POST | `/user`
    - Requires `Authorization` header
    - form-urlencoded body
	- Returns a JSON object - the new record
    - Creates a new user record
    
- DELETE | `/user/:id`
    - Requires `Authorization` header
    - form-urlencoded body
    - Returns a JSON object - the deleted record
    - Deletes a user record

- PUT | `/user/:id`
    - Requires `Authorization` header
    - form-urlencoded body
    - Updates an existing record identified by ID (url param)
    - Returns a JSON object - the updated record