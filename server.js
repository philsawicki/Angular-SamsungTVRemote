// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var SamsungRemote = require('./proxy/Samsung-Remote');


var viewsFolder = './views/';


// configure remote
var remote = new SamsungRemote({
    ip: '192.168.2.13' // required: IP address of the Samsung Smart TV
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Got ' + req.method + ' request for "' + req.url + '"');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/tv')
	.post(function (req, res) {

	});
router.route('/tv/:commandID')
	.get(function (req, res) {
		remote.send(req.params.commandID, 
            function successCallback () {
                res.json({
                	message: 'Got command "' + req.params.commandID + '"',
                	success: true,
                	error: false
                });
            },
            function errorCallback (error) {
                res.json({
                	message: 'Got command "' + req.params.commandID + '"',
                	success: false,
                	error: true,
                	error: error
                });
            }
        );
	});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/', function (req, res) {
	res.sendfile(viewsFolder + 'index.html')
})

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port "' + port + '"');
