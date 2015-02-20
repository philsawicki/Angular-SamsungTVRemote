'use strict';


/**
 * UPnP Device discovery API.
 * 
 * @return {Object}
 */
var DiscoveryService = function () {

    /**
     * Include the "Q" library.
     * 
     * @type {Q}
     * @private
     */
    var Q = require('q');

    /**
     * Include the "HTTP" library.
     * 
     * @type {http}
     * @private
     */
    var http = require('http');


    /**
     * Perform an SSDP Search for Devices on the network, using the given SSDP Search string.
     * 
     * @param  {string} SSDPSearchString The SSDP Search string to use for Device search.
     * @param  {Object} options          Configuration object for SSDP search (including Timeout delay, etc.).
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     * @public
     */
    var search = function (SSDPSearchString, options) {
        options = options || {};
        options.SSDPTimeout = options.SSDPTimeout || 2*1000;

        var deferred = Q.defer();

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
        client.search(SSDPSearchString);

        // Wait a few seconds while waiting for responses:
        setTimeout(function () {
            deferred.resolve(responses);
        }, options.SSDPTimeout);

        return deferred.promise;
    };

    /**
     * Get all SSDP Devices on the network.
     * 
     * @param  {Object} options Configuration object for SSDP search (including Timeout delay, etc.).
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     * @public
     */
    var getAllDevices = function (options) {
        return search('ssdp:all', options);
    };

    /**
     * Get all Samsung SmartTV Devices on the network.
     * 
     * @param  {Object} options Configuration object for SSDP search (including Timeout delay, etc.).
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     * @public
     */
    var getAllSamsungSmartTVs = function (options) {
    	return search('urn:samsung.com:device:RemoteControlReceiver:1', options);
    };

    /**
     * Get all "Rendering Controls" on the network.
     * 
     * @param  {Object} options Configuration object for SSDP search (including Timeout delay, etc.).
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     * @public
     */
    var getAllRenderingControls = function (options) {
    	return search('urn:schemas-upnp-org:service:RenderingControl:1', options);
    };

    /**
     * Return the SmartTV "description.xml" file for the given TV "LOCATION" header.
     * 
     * @param  {string} locationURL The URL of the "description.xml" file.
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     */
    var getDescription = function (locationURL) {
        var deferred = Q.defer();

        http.get(locationURL, function (xmlRes) {
            var buffer = '';

            xmlRes.on('data', function (data) {
                buffer += data;
            });
            xmlRes.on('end', function (data) {
                deferred.resolve(buffer);
            });
        }).on('error', function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    return {
        search: search,

        getAllDevices: getAllDevices,
        getAllSamsungSmartTVs: getAllSamsungSmartTVs,
        getAllRenderingControls: getAllRenderingControls,

        getDescription: getDescription
    };
}();


/**
 * Export the API Module.
 * 
 * @type {Object}
 */
module.exports = DiscoveryService;
