/*
 Implement fully RESTful API web service for testing an api client
 */

var config = require('../../data/config');
//var utils                   = require('../../utils');
var ip = require('ip');
var njds = require('nodejs-disks');
var os = require('os');
var moment = require('moment');

// Return a test response - used for ping tests
// - returns 200 Success.
exports.getPing = function ( req, res, next ) {

	console.log(new Date() + ': Ping test request received');
	res.send(200, '');

};

// Return a fuller test response - used for health check tests
// - returns 200 Success plus a JSON object with various parameters.
exports.getHealth = function ( req, res, next ) {

	console.log(new Date() + ': Health test request received');

	/*
	 Checks:
	 - Is data folder directly readable, or writable?
	 - System uptime (os.uptime())
	 - System free memory
	 - Free disk space: https://www.npmjs.com/package/diskspace
	 */

	// Query drives
	njds.drives(
		function ( err, drives ) {

			// Check each drive for the root drive
			njds.drivesDetail(drives, function ( err, data ) {

				// Find root drive
				var rootDrive = 'Unable to identify root volume';
				for ( var i = 0; i < data.length; i++ ) {
					if ( data[i].mountpoint == '/' ) {
						rootDrive = data[i];
						break;
					}
				}

				// Calculate memory usage
				var processMemoryUsage = process.memoryUsage();
				var total = Math.ceil(processMemoryUsage.heapTotal / 1024 / 1024);
				var used = Math.ceil(processMemoryUsage.heapUsed / 1024 / 1024);
				var free = total - used;
				var nodeMemory = {
					total: total + 'MB',
					used : used + 'MB',
					free : free + 'MB'
				};

				// System memory
				total = Math.ceil(os.totalmem() / 1024 / 1024);
				free = Math.ceil(os.freemem() / 1024 / 1024);
				used = total - free;
				var sysMemory = {
					total: total + 'MB',
					used : used + 'MB',
					free : free + 'MB'
				};

				// Send response
				res.json(200, {
					ip       : {
						address: ip.address(),
						local  : ip.isPrivate(ip.address())
					},
					diskSpace: {
						total  : rootDrive.total,
						free   : rootDrive.available,
						used   : rootDrive.used,
						free_pc: rootDrive.freePer + '%',
						used_pc: rootDrive.usedPer + '%',
					},
					uptime   : {
						minutes: Math.ceil(os.uptime() / 60),
						human  : moment.duration(os.uptime(), "seconds").humanize()
					},
					memory   : {
						node  : nodeMemory,
						system: sysMemory
					}
				});

			});

		}
	);

};