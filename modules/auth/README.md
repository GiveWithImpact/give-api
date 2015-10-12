# Auth module
Login using either a fixed application token via the `Authorization` header, or obtain a user token 
via the '/auth/login` method which issues a token.
  
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
    
## The user authentication request flow
 1. Log in using `/auth/login`
 2. The response includes a `token` property.
 3. For all future authenticated requests, include the token as the `Authorization` HTTP header.
 4. When calling `/auth/logout` this call will remove the user token from the user record, 
 therefore preventing access until the user logs in again.
 
## Using the guest app token
The guest app token is used for non-logged in calls, such as `/account/registration`
    