'use strict';


/**
 * Samsung SmartTV Browser API.
 * @return {Object}
 */
var browserApi = function () {

    /**
     * Open a browser on the SmartTV.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var navigate = function (req, res) {
        var websiteURL = req.params.websiteURL;

        // Validate expected parameters:
        if (!websiteURL) {
            res.status(400);
            res.json({
                message: 'Missing Website URL',
                success: false,
                error: true,
                errorMessage: 'Missing Website URL'
            });
        }

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
            host: '192.168.2.13',
            path: '/smp_4_',
            port: 7676,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#RunBrowser"'
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


    return {
        navigate: navigate
    };
}();


/**
 * Export the API Module.
 * @type {Object}
 */
module.exports = browserApi;
