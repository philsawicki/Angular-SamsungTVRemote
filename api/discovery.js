'use strict';


/**
 * UPnP Device discovery API.
 * 
 * @return {Object}
 */
var DiscoveryEndpoint = function () {

    /**
     * Include the "DiscoveryService" library.
     * 
     * @type {DiscoveryService}
     * @private
     */
    var DiscoveryService = require('./services/discoveryService');


    /**
     * Return a list of all devices which replied to the UPnP request.
     * 
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     * @public
     */
    var all = function (req, res) {
        DiscoveryService.getAllDevices()
        .then(
            function success (data) {
                res.json(data);
            },
            function error (reason) {
                res.status(500).json(reason);
            }
        );
    };

    return {
        all: all
    };
}();


/**
 * Export the API Module.
 * 
 * @type {Object}
 */
module.exports = DiscoveryEndpoint;
