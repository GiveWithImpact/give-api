# Test API
    
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