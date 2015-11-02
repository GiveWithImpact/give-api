# Users(s) API

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
	- Searches on name, email fields
	
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