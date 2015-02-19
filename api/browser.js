'use strict';


/**
 * Samsung SmartTV Browser API.
 * @return {Object}
 */
var browserApi = function () {

    /**
     * Include the "BrowserService" library.
     * 
     * @type {BrowserService}
     * @private
     */
    var BrowserService = require('./services/browserService');

    /**
     * Open a browser on the SmartTV.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var navigate = function (req, res) {
        var tvHost = req.params.host;
        var tvPath = req.params.path;
        var tvPort = req.params.port;
        var websiteURL = req.params.websiteURL;

        // Validate expected parameters:
        if (!websiteURL) {
            res.status(400).json({
                message: 'Missing Website URL',
                success: false,
                error: true,
                errorMessage: 'Missing Website URL'
            });
        }

        BrowserService.navigate(tvHost, tvPath, tvPort, websiteURL)
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


    return {
        navigate: navigate
    };
}();


/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = browserApi;
