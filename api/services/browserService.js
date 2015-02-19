'use strict';


/**
 * Browser Service.
 * 
 * @return {Object}
 */
var BrowserService = function () {

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
     * Open a web browser on the connected SmartTV.
     * 
     * @param  {string} tvHost     The SmartTV Host (e.g.: "192.168.2.13").
     * @param  {string} tvPath     The SmartTV Path (e.g.: "/smp_4_").
     * @param  {int}    tvPort     The SmartTV Port (e.g.: 7676).
     * @param  {string} websiteURL The URL to open on the SmartTV web browser.
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     */
    var navigate = function (tvHost, tvPath, tvPort, websiteURL) {
        var deferred = Q.defer();

        var body = ''
            + '<?xml version="1.0" encoding="utf-8"?>'
            +     '<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
            +         '<s:Body>'
            +             '<u:RunBrowser xmlns:u="urn:samsung.com:service:MainTVAgent2:1">'
            +                 '<BrowserURL>' + websiteURL + '</BrowserURL>'
            +             '</u:RunBrowser>'
            +         '</s:Body>'
            +     '</s:Envelope>';

        var postRequest = {
            host: tvHost, //'192.168.2.13',
            path: '/smp_4_', //tvPath
            port: 7676, //tvPort
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#RunBrowser"'
            }
        };

        var buffer = '';

        var tvReq = http.request(postRequest, function (tvRes) {
            tvRes.setEncoding('utf8');

            tvRes.on('data', function (data) {
                buffer += data;
            });
            tvRes.on('end', function (data) {
                deferred.resolve(buffer);
            });
        });

        tvReq.write(body);
        tvReq.end();

        return deferred.promise;
    };


    return {
        navigate: navigate
    };
}();


/**
 * Export the API Module.
 * 
 * @type {Object}
 */
module.exports = BrowserService;
