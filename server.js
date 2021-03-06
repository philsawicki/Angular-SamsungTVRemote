/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    xmlBodyParser = require('express-xml-bodyparser');

/**
 * API Modules.
 */

var tvAPI = require('./api/tv'),
    discoveryAPI = require('./api/discovery'),
    browserAPI = require('./api/browser');

var textBodyParser = bodyParser.text();



/**
 * Configure the Samsung SmartTV Remote.
 */
tvAPI.configureRemote({
    ip: '192.168.2.13' // IP address of the Samsung SmartTV (required)
});



/**
 * Configure Express.
 */

var viewsFolder = './dist/',
    serverPort = process.env.PORT || 8080,
    serverInterface = process.env.INTERFACE || '0.0.0.0'; // 'localhost';

// Use bodyParser() to get the data from POST requests:
app.use(bodyParser.text({ type: 'text/xml' }));
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies.
app.use(bodyParser.json()); // Support JSON-encoded bodies.
app.use(xmlBodyParser());
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.errorHandler());

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
router.route('/tv/GetAvailableActions/:host/:port/:tvControlUrl')
    .get( tvAPI.getAvailableActions )
    .post( tvAPI.getAvailableActions );
router.route('/tv/livestream/:host/:port/:tvControlUrl')
    .get( tvAPI.livestream )
    .post( tvAPI.livestream );
router.route('/tv/subscribe/:host/:port?/:tvControlUrl?')
    .get( tvAPI.subscribe )
    .post( tvAPI.subscribe );
//router.route('/tv/gena/1')
//    .notify( tvAPI.notify );
router.route('/tv/GetVolume/:host/:port?')
    .get( tvAPI.getVolume )
    .post( tvAPI.getVolume );
router.route('/tv/SetVolume/:host/:port?/:volume')
    .get( tvAPI.setVolume )
    .post( tvAPI.setVolume );
router.route('/tv/commands')
    .get( tvAPI.getSupportedCommands );
router.route('/tv/command/:tvIP?/:commandID')
    .get( tvAPI.sendCommand )
    .post( tvAPI.sendCommand );

router.route('/browse/:host/:path?/:port?/:websiteURL')
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
app.notify('/api/tv/gena/1', textBodyParser, tvAPI.notify);

/**
 * Serve "/dist" folder for distribution.
 */
app.use('/css',  express.static(viewsFolder + '/css'));
app.use('/js', express.static(viewsFolder + '/js'));
app.get('/', function (req, res) {
    res.sendfile(viewsFolder + 'index.html')
});




/**
 * Start the server.
 */
app.listen(serverPort, serverInterface, function () {
    /*
    var os = require('os');
    var networkInterfaces = os.networkInterfaces();
    var networkIPAddresses = [];
    for (var i in networkInterfaces) {
        for (var j in networkInterfaces[i]) {
            var networkIPAddress = networkInterfaces[i][j];
            if (networkIPAddress.family === 'IPv4' && !networkIPAddress.internal) {
                networkIPAddresses.push(networkIPAddress.address);
            }
        }
    }
    */
    var ipService = require('./api/services/ipService');
    var networkIPAddresses = ipService.getIPAddresses();

    console.log('API server started on "http://%s:%d" in %s mode', serverInterface, serverPort, app.settings.env);
    console.log('API server also available on:');
    for (var i = 0, nbAddresses = networkIPAddresses.length; i < nbAddresses; i++) {
        console.log('   * http://%s:%d', networkIPAddresses[i], serverPort);
    }
});




/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = app;
