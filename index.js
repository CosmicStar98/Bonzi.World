// ========================================================================
// Server init
// ========================================================================

// Filesystem reading functions
const fs = require('fs-extra');

// Load settings
try {
	stats = fs.lstatSync('settings.json');
} catch (e) {
	// If settings do not yet exist
	if (e.code == "ENOENT") {
		try {
			fs.copySync(
				'settings.example.json',
				'settings.json'
			);
			console.log("Created new settings file.");
		} catch(e) {
			console.log(e);
			throw "Could not create new settings file.";
		}
	// Else, there was a misc error (permissions?)
	} else {
		console.log(e);
		throw "Could not read 'settings.json'.";
	}
}

// Load settings into memory
const settings = require("./settings.json");
// Setup basic express server

var express = require('express');
var app = express();
if (settings.express.serveStatic)
	app.use(express.static('./build/www'));
var server = require('http').createServer(app);

// Init socket.io
var io = require('socket.io')(server);
var port = process.env.PORT || settings.port;

exports.io = io;

// Init sanitize-html
var sanitize = require('sanitize-html');

// Init winston loggers (hi there)
const Log = require('./log.js');
Log.init();
const log = Log.log;

// Load ban list
const Ban = require('./ban.js');
Ban.init();

// Start actually listening
server.listen(port, function () {
	console.log(
		"\n",
		"Server domain: localhost\n",
		"------------------------\n",
		"Server listening on port: " + port
	);
});
app.use(express.static(__dirname + '/public'));
app.use(( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    next();
});
// Handle bad requests
app.use((req, res, next) => {
    res.status(404).send(
        '<html><head><title>404 Not Found</title></head><body><center><h1>404 Not Found</h1></center><hr><center>nginx/1.19.5</center><!-- a padding to disable MSIE and Chrome friendly error page --><!-- a padding to disable MSIE and Chrome friendly error page --><!-- a padding to disable MSIE and Chrome friendly error page --><!-- a padding to disable MSIE and Chrome friendly error page --><!-- a padding to disable MSIE and Chrome friendly error page --><!-- a padding to disable MSIE and Chrome friendly error page --></body><style type="text/css" id="stylish_s_empty"></style></html>')
})
// Handle Bonzi.WORLD API requests
 app.get('/api/v1/', (req, res) => res.sendStatus('hello world'))
app.get('/api/v1/rooms/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./rooms.json')));
})
app.get('/api/v1/identity/user/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./user.json')));
})
app.get('/api/v1/identity/fingerprint/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./fingerprint.json')));
})
app.get('/api/v1/session/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./session.json')));
})
app.get('/api/v1/login/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./logins.json')));
})
app.get('/api/v1/login/register/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./register.json')));
}) 
app.get('/api/v1/login/forgot/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./forgot.json')));
})
app.get('/api/v1/unload/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(require('./unload.json')));
})
  
// Patch logins
app.post( "/api/v2/login/", async ( req, res ) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.username,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send( {
            user,
            token,
        } );
    } catch ( e ) {
        res.status( 400 ).send( {
            error: "Catch error",
            e,
        } );
    }
} );

// ========================================================================
// Banning functions
// ========================================================================

// ========================================================================
// Helper functions
// ========================================================================

const Utils = require("./utils.js")

// ========================================================================
// The Beef(TM)
// ========================================================================

const Meat = require("./meat.js");
Meat.beat();

// Console commands
const Console = require('./console.js');
Console.listen();