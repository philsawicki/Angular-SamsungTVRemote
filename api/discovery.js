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
            responses.push({
                headers: headers,
                statusCode: statusCode,
                rinfo: rinfo
            });
        });

        // Search for a service type:
        client.search('ssdp:all');

        // Wait a few seconds while waiting for responses:
        setTimeout(function () {
            res.json(responses);
        }, 2*1000);
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
