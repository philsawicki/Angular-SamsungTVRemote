'use strict';


/**
 * Samsung SmartTV API.
 * @return {Object}
 */
var tvApi = function () {

    /**
     * Include "Q" library.
     * @type {Q}
     */
    var Q = require('q');

    /**
     * Samsung Remote.
     * @type {SamsungRemote|undefined}
     */
    var _remote = undefined;

    /**
     * HTTP Web requests.
     * @type {http}
     */
    var _http = require('http');

    /**
     * Discovery Service.
     * @type {DiscoveryService}
     */
    var DiscoveryService = require('./services/discoveryService');

    /**
     * TV Service.
     * @type {TVService}
     */
    var TVService = require('./services/tvService');


    /**
     * Configure the Samsung Remote
     * @param  {Object} options The configuration options for the Samsung SmartTV Remote.
     * @return {void}
     */
    var configureRemote = function (options) {
        var SamsungRemote = require('./../proxy/Samsung-Remote');

        _remote = new SamsungRemote(options);
    };

    /**
     * Return an array of SSDP responses from connected Samsung SmartTVs which replied to UPnP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {void}
     */
    var discovery = function (req, res) {
        DiscoveryService.getAllSamsungSmartTVs()
        .then(
            function success (data) {
                res.json(data);
            },
            function error (reason) {
                res.status(500).json(reason);
            }
        );
    };

    /**
     * Return the SmartTV "description.xml" file for the given TV "LOCATION" header.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var detailsForSpecificTV = function (req, res) {
        var tvLocationUrl = req.params.tvLocationUrl;

        // Validate expected parameters:
        if (!tvLocationUrl) {
            res.status(400).json({
                message: 'Missing TV Location URL',
                success: false,
                error: true,
                errorMessage: 'Missing TV Location URL'
            });
        }

        
        DiscoveryService.getDescription(tvLocationUrl)
        .then(
            function success (data) {
                res.write(data);
                res.end();
            },
            function error (reason) {
                res.status(500).json(reason);
                res.end();
            }
        );
    };

    /**
     * Return the SmartTV's response to the "GetDTVInformation" SOAP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var getDTVInformation = function (req, res) {
        var tvHost = req.params.host;
        var tvPort = req.params.port;
        var tvControlUrl = req.params.tvControlUrl;

        // Validate expected parameters:
        if (!tvControlUrl) {
            res.status(400).json({
                message: 'Missing TV Control URL',
                success: false,
                error: true,
                errorMessage: 'Missing TV Control URL'
            });
        }


        TVService.getDTVInformation(tvHost, tvPort, tvControlUrl)
        .then(
            function success (data) {
                res.write(data);
                res.end();
            },
            function error (reason) {
                res.status(500).json(reason);
            }
        );
    };

    /**
     * Return the SmartTV's response to the "GetAvailableActions" SOAP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var getAvailableActions = function (req, res) {
        var tvHost = req.params.host;
        var tvPort = req.params.port;
        var tvControlUrl = req.params.tvControlUrl;

        // Validate expected parameters:
        if (!tvControlUrl) {
            res.status(400).json({
                message: 'Missing TV Control URL',
                success: false,
                error: true,
                errorMessage: 'Missing TV Control URL'
            });
        }


        TVService.getAvailableActions(tvHost, tvPort, tvControlUrl)
        .then(
            function success (data) {
                res.write(data);
                res.end();
            },
            function error (reason) {
                res.status(500).json(reason);
            }
        );
    };

    /**
     * Return the SmartTV's response to the "livestream" HTTP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var livestream = function (req, res) {
        var tvHost = req.params.host;
        var tvPort = req.params.port;
        var tvControlUrl = req.params.tvControlUrl;

        // Validate expected parameters:
        if (!tvControlUrl) {
            res.status(400).json({
                message: 'Missing TV Control URL',
                success: false,
                error: true,
                errorMessage: 'Missing TV Control URL'
            });
        }


        TVService.livestream(tvHost, tvPort, tvControlUrl)
        .then(
            function success (data) {
                res.write(data);
                res.end();
            },
            function error (reason) {
                res.status(500).json(reason);
            }
        );
    };

    /**
     * Return the SmartTV's response to the "SUBSCRIBE" HTTP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var subscribe = function (req, res) {
        var tvHost = req.params.host;
        var tvPort = req.params.port;
        var tvControlUrl = req.params.tvControlUrl;

        // Validate expected parameters:
        //if (!tvControlUrl) {
        //    res.status(400).json({
        //        message: 'Missing TV Control URL',
        //        success: false,
        //        error: true,
        //        errorMessage: 'Missing TV Control URL'
        //    });
        //}

        TVService.subscribe(tvHost, tvPort, tvControlUrl)
        .then(
            function success (data) {
                res.write(data);
                res.end();
            },
            function error (reason) {
                res.status(500).json(reason);
            }
        );
    };

    /**
     * Return the SmartTV's response to the "NOTIFY" HTTP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     *
     * http://stackoverflow.com/questions/20909778/how-to-use-socket-io-in-express-routes
     */
    var notify = function (req, res) {
        console.log('HEADERS = ', req.headers);
        console.log('BODY = ', JSON.stringify(req.body));
    };

    /**
     * Return the SmartTV "description.xml" file, listing product information & its specs.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {void}
     */
    var details = function (req, res) {
        var SSDPClient = require('node-ssdp').Client,
            client = new SSDPClient(),
            SSDPResponses = [];

        client.on('response', function (headers, statusCode, rinfo) {
            // Split on line breaks ("/r/n"):
            var headersFormatted = headers.split( String.fromCharCode(13, 10) );
            
            // Extract the headers:
            var headersParsed = {};
            for (var i = 0, nbHeaders = headersFormatted.length; i < nbHeaders; i++) {
                var item = headersFormatted[i];

                var firstColonIndex = item.indexOf(':');
                if (firstColonIndex > -1) {
                    var key = item.substring(0, firstColonIndex);
                    var value = item.substring(firstColonIndex + 1, item.length).trim();

                    headersParsed[key] = value;
                }
            }

            SSDPResponses.push({
                headers: headers,
                headersFormatted: headersFormatted,
                headersParsed: headersParsed,
                statusCode: statusCode,
                rinfo: rinfo
            });
        });

        // Search for a service type:
        client.search('urn:samsung.com:service:MultiScreenService:1');

        // Wait a few seconds while waiting for SSDP responses:
        setTimeout(function () {
            if (SSDPResponses.length > 0) {
                var firstResponse = SSDPResponses[0];

                var location = firstResponse.headersParsed['LOCATION'];
                if (location) {
                    var http = require('http');

                    http.get(location, function (xmlRes) {
                        var buffer = '';

                        xmlRes.on('data', function (data) {
                            buffer += data;
                        });
                        xmlRes.on('end', function (data) {
                            res.write(buffer);
                            res.end();
                        });
                    }).on('error', function (error) {
                        res.json({
                            message: 'Error.',
                            success: false,
                            error: true,
                            errorMessage: error
                        });
                    });
                }
            } else {
                res.json({
                    message: 'No TV connected.',
                    success: false,
                    error: true,
                    errorMessage: 'No TV connected'
                });
            }
        }, 1*1000);
    };

    /**
     * Send the given command to the SmartTV through the Remote.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {void}
     */
    var sendCommand = function (req, res) {
        var tvIP = req.params.tvIP;
        var commandID = req.params.commandID;

        // Validate expected parameters:
        if (!commandID) {
            res.status(400).json({
                message: 'Missing TV Command',
                success: false,
                error: true,
                errorMessage: 'Missing TV Command'
            });
        }

        // Update TV IP if provided:
        if (typeof tvIP !== 'undefined') {
            _remote.setTVIP(tvIP);
        }

        _remote.send(commandID, 
            function successCallback () {
                res.json({
                    message: 'Successfully executed command "' + commandID + '"',
                    success: true,
                    error: false
                });
            },
            function errorCallback (error) {
                res.json({
                    message: 'Failed to execute command "' + commandID + '"',
                    success: false,
                    error: true,
                    errorMessage: error
                });
            }
        );
    };

    /**
     * Try to send a client request for a "StartCloneView".
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {void}
     */
    var watch = function (req, res) {
        var body = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:StartCloneView xmlns:u="urn:samsung.com:service:MainTVAgent2:1"><ForcedFlag>Normal</ForcedFlag></u:StartCloneView></s:Body></s:Envelope>';

        var postRequest = {
            host: '192.168.2.13',
            path: '/smp_4_',
            port: 7676,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#StartCloneView"'
            }
        };

        var buffer = '';

        var tvReq = _http.request(postRequest, function (tvRes) {
            console.log('STATUS: ' + tvRes.statusCode);
            console.log('HEADERS: ' + JSON.stringify(tvRes.headers));
            tvRes.setEncoding('utf8');

            tvRes.on('data', function (data) {
                buffer += data;
            });
            tvRes.on('end', function (data) {
                console.log('GOT: ' + buffer.length, buffer);
                res.write(buffer);
                res.end();
            });
        });

        tvReq.write(body);
        tvReq.end();
    };

    /**
     * Return the list of supported SmartTV Commands.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {void}
     */
    var getSupportedCommands = function (req, res) {
        var SmasungKeys = require('./../proxy/Samsung-Keys');
        var supportedCommands = [];

        for (var key in SmasungKeys) {
            supportedCommands.push(key);
        }

        res.json(supportedCommands);
    };

    var getVolume = function (req, res) {
        var tvHost = req.params.host;
        var tvPort = req.params.port || 52235;


        var body = '<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ns0:GetVolume xmlns:ns0="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>0</InstanceID><Channel>Master</Channel></ns0:GetVolume></s:Body></s:Envelope>';

        var postRequest = {
            host: tvHost,
            path: '/smp_14_', //'/upnp/control/RenderingControl1',
            port: 7676,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                //'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:schemas-upnp-org:service:RenderingControl:1#GetVolume"',
                'Connection': 'Close',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        var buffer = '';
        var tvRequestHasError = false;
        var tvRequestError = {};

        var tvReq = _http.request(postRequest, function (tvRes) {
            console.log('STATUS: ' + tvRes.statusCode);
            console.log('HEADERS: ' + JSON.stringify(tvRes.headers));
            tvRes.setEncoding('utf8');

            tvRes.on('data', function (data) {
                buffer += data;
            });
            tvRes.on('error', function (error) {
                tvRequestHasError = true;
                tvRequestError = error;
                //res.status(500).write(error);
            });
            tvRes.on('end', function (data) {
                console.log('BODY: "' + buffer + '"');
                if (!tvRequestHasError) {
                    res.write(buffer);
                    res.end();
                } else {
                    res.status(500).write(error);
                    res.end();
                }
            });
        });
        tvReq.on('error', function (error) {
            res.status(500).json({
                message: 'Error.',
                success: false,
                error: true,
                errorMessage: error
            });
        });;

        tvReq.write(body);
        tvReq.end();
    };

    var setVolume = function (req, res) {
        var tvHost = req.params.host;
        var tvPort = req.params.port || 52235;
        var tvVolume = req.params.volume;


        // Validate expected parameters:
        if (!tvVolume) {
            res.status(400).json({
                message: 'Missing Volume',
                success: false,
                error: true,
                errorMessage: 'Missing Volume'
            });
        } else if (tvVolume < 0 || tvVolume > 100) {
            res.status(400).json({
                message: 'Volume out of bounds',
                success: false,
                error: true,
                errorMessage: 'Volume out of bounds'
            });
        }


        var body = ''
            + '<?xml version="1.0" encoding="utf-8"?>'
            +    '<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
            +       '<s:Body>'
            +          '<ns0:SetVolume xmlns:ns0="urn:schemas-upnp-org:service:RenderingControl:1">'
            +             '<InstanceID>0</InstanceID>'
            +             '<Channel>Master</Channel>'
            +             '<InstanceID>0</InstanceID>'
            +             '<DesiredVolume>' + tvVolume + '</DesiredVolume>'
            +          '</ns0:SetVolume>'
            +       '</s:Body>'
            +    '</s:Envelope>';

        var postRequest = {
            host: tvHost,
            path: '/upnp/control/RenderingControl1',
            port: tvPort,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:schemas-upnp-org:service:RenderingControl:1#SetVolume"'
            }
        };

        var buffer = '';

        var tvReq = _http.request(postRequest, function (tvRes) {
            tvRes.setEncoding('utf8');

            tvRes.on('data', function (data) {
                buffer += data;
            });
            tvRes.on('end', function (data) {
                res.write(buffer);
                res.end();
            });
        });

        tvReq.write(body);
        tvReq.end();
    };


    return {
        configureRemote: configureRemote,
        discovery: discovery,
        sendCommand: sendCommand,
        watch: watch,
        getSupportedCommands: getSupportedCommands,
        details: details,
        detailsForSpecificTV: detailsForSpecificTV,

        getDTVInformation: getDTVInformation,
        getAvailableActions: getAvailableActions,
        livestream: livestream,
        subscribe: subscribe,
        notify: notify,

        getVolume: getVolume,
        setVolume: setVolume
    };
}();


/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = tvApi;
