/*
    Application utilities
 */

// Get a mysql DATETIME field compatible current timestamp
exports.mysqlCurrentTimestamp = function(){
    return new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
}

// Get the proper request IP Address
exports.getClientIp = function(req) {
    var ipAddress;
    // Amazon EC2 / Heroku workaround to get real client IP
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        // 'x-forwarded-for' header may return multiple IP addresses in
        // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
        // the first one
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        // Ensure getting client IP address still works in
        // development environment
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

// Check if a user is logged in
exports.checkSession = function(req, res){
    if (!(req.session && req.session.user && req.session.user.user_name)){
        res.send(401, 'Unauthorised');
    }
    return true;
};

// Test an object to see if empty object
exports.isEmptyObject = function(obj){
    return Object.getOwnPropertyNames(obj).length === 0;
};