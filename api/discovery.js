'use strict';


/**
 * UPnP Device discovery API.
 * @return {Object}
 */
var discoveryApi = function () {

    /**
     * Return a list of all devices which replied to the UPnP request.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var all = function (req, res) {
        var SSDPClient = require('node-ssdp').Client,
            client = new SSDPClient(),
            responses = [];

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

            responses.push({
                headers: headers,
                headersFormatted: headersFormatted,
                headersParsed: headersParsed,
                statusCode: statusCode,
                rinfo: rinfo
            });
        });

        // Search for a service type:
        client.search('ssdp:all');

        // Wait a few seconds while waiting for responses:
        setTimeout(function () {
            res.json(responses);
        }, 1*1000);
    };


    return {
        all: all
    };
}();


/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = discoveryApi;
