'use strict';


/**
 * Samsung SmartTV API.
 * @return {Object}
 */
var tvApi = function () {

    /**
     * Samsung Remote.
     * @type {SamsungRemote|undefined}
     */
    var _remote = undefined;


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
            res.json(SSDPResponses);
        }, 1*1000);
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
            res.json({
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

        var http = require('http');
        var buffer = '';

        var tvReq = http.request(postRequest, function (tvRes) {
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
        res.end();
    };


    return {
        configureRemote: configureRemote,
        discovery: discovery,
        sendCommand: sendCommand,
        watch: watch,
        getSupportedCommands: getSupportedCommands,
        details: details
    };
}();


/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = tvApi;
