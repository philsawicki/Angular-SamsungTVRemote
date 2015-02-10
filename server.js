/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

/**
 * API Modules.
 */

var tvAPI = require('./api/tv'),
    discoveryAPI = require('./api/discovery'),
    browserAPI = require('./api/browser');



/**
 * Configure the Samsung SmartTV Remote.
 */
tvAPI.configureRemote({
    ip: '192.168.2.13' // IP address of the Samsung SmartTV (required)
});




/**
 * Configure Express.
 */

var viewsFolder = './app/views/',
    port = process.env.PORT || 8080;

// Use bodyParser() to get the data from POST requests:
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies.
app.use(bodyParser.json()); // Support JSON-encoded bodies.

// Enable CORS:
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});




/**
 * Configure routes.
 */

var router = express.Router();

// middleware to use for all requests:
router.use(function (req, res, next) {
    // Log the request:
    console.log('Got ' + req.method + ' request for "' + req.url + '"');

    next(); // Make sure we go to the next routes and don't stop here.
});


// Test route to make sure everything is working (accessed through a GET at "http://localhost:8080/api"):
router.get('/', function (req, res) {
    res.json({
        message: 'Hooray! Welcome to our API!'
    });   
});


// Service discovery:
// From: http://www.samsungdforum.com/Guide/art00030/index.html
// http://pastebin.com/jhSzuVSp
// https://www.virusbtn.com/pdf/conference/vb2014/VB2014-Oh.pdf
router.route('/tv/discovery')
    .get( tvAPI.discovery );
router.route('/tv/watch')
    .get( tvAPI.watch );
router.route('/tv/details')
    .get( tvAPI.details );
router.route('/tv/details/:tvLocationUrl')
    .get( tvAPI.detailsForSpecificTV )
    .post( tvAPI.detailsForSpecificTV );
router.route('/tv/GetDTVInformation/:host/:port/:tvControlUrl')
    .get( tvAPI.getDTVInformation )
    .post( tvAPI.getDTVInformation );
router.route('/tv/commands/')
    .get( tvAPI.getSupportedCommands );
router.route('/tv/command/:tvIP?/:commandID')
    .get( tvAPI.sendCommand )
    .post( tvAPI.sendCommand );

router.route('/browse/:websiteURL')
    .get( browserAPI.navigate )
    .post( browserAPI.navigate );

router.route('/discovery/all')
    .get( discoveryAPI.all );

// ...




/**
 * Register routes to the application.
 *
 * All routes will be prefixed by "/api".
 */
app.use('/api', router);

app.get('/', function (req, res) {
    res.sendfile(viewsFolder + 'index.html')
});




/**
 * Start the server.
 */

app.listen(port);
console.log('Server listening on port "' + port + '"');




/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = app;
