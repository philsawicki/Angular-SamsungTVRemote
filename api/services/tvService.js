'use strict';


/**
 * TV Service.
 * 
 * @return {Object}
 */
var TVService = function () {

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
     * Return the SmartTV's response to the "GetDTVInformation" SOAP request.
     * 
     * @param  {string} tvHost       The SmartTV Host (e.g.: "192.168.2.13").
     * @param  {int}    tvPort       The SmartTV Port (e.g.: 7676).
     * @param  {string} tvPath       The SmartTV Path (e.g.: "/smp_4_").
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     */
    var getDTVInformation = function (tvHost, tvPort, tvPath) {
        var deferred = Q.defer();

        var body = ''
            + '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'
            +     '<s:Body>'
            +         '<u:GetDTVInformation xmlns:u="urn:samsung.com:service:MainTVAgent2:1"></u:GetDTVInformation>'
            +     '</s:Body>'
            + '</s:Envelope>';

        var postRequest = {
            host: tvHost,
            path: '/smp_4_', // Even tough the "controlURL" can be something like "/smp_8_", the TV seems to only respond when queried through "/smp_4_"...
            port: tvPort,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#GetDTVInformation"'
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

    /**
     * Return the SmartTV's response to the "GetAvailableActions" SOAP request.
     * 
     * @param  {string} tvHost       The SmartTV Host (e.g.: "192.168.2.13").
     * @param  {int}    tvPort       The SmartTV Port (e.g.: 7676).
     * @param  {string} tvPath       The SmartTV Path (e.g.: "/smp_4_").
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     */
    var getAvailableActions = function (tvHost, tvPort, tvPath) {
        var deferred = Q.defer();

        var body = ''
            + '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'
            +     '<s:Body>'
            +         '<u:GetAvailableActions xmlns:u="urn:samsung.com:service:MainTVAgent2:1"></u:GetAvailableActions>'
            +     '</s:Body>'
            + '</s:Envelope>';

        var postRequest = {
            host: tvHost,
            path: '/smp_4_', // Even tough the "controlURL" can be something like "/smp_8_", the TV seems to only respond when queried through "/smp_4_"...
            port: tvPort,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset="utf-8"',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#GetAvailableActions"'
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

    /**
     * Return the SmartTV's response to the "livestream" HTTP request.
     * 
     * @param  {string} tvHost       The SmartTV Host (e.g.: "192.168.2.13").
     * @param  {int}    tvPort       The SmartTV Port (e.g.: 9090).
     * @param  {string} tvPath       The SmartTV Path (e.g.: "/livestream/1").
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     */
    var livestream = function (tvHost, tvPort, tvPath) {
        var deferred = Q.defer();

        var body = '';

        var getRequest = {
            host: tvHost,
            path: '/livestream/1', // Even tough the "controlURL" can be something like "/smp_8_", the TV seems to only respond when queried through "/smp_4_"...
            port: 9090,
            method: 'GET',
            headers: {
                //'Content-Type': 'text/xml;charset="utf-8"',
                //'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'Lavf52.104.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                'Accept': '*/*',
                'Range': 'bytes=0-'
                //'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#GetAvailableActions"'
            }
        };

        var buffer = '';

        var tvReq = http.request(getRequest, function (tvRes) {
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

    /**
     * Return the SmartTV's response to the "SUBSCRIBE" HTTP request.
     * 
     * @param  {string} tvHost       The SmartTV Host (e.g.: "192.168.2.13").
     * @param  {int}    tvPort       The SmartTV Port (e.g.: 7676).
     * @param  {string} tvPath       The SmartTV Path (e.g.: "/smp_5_").
     * @return {Deferred.Promise} A promise to be resolved/rejected when results become available.
     */
    var subscribe = function (tvHost, tvPort, tvPath) {
        var deferred = Q.defer();

        if (typeof tvPort === 'undefined') {
            tvPort = 7676;
        }
        if (typeof tvPath === 'undefined') {
            tvPath = '/smp_5_';
        }

        var ipService = require('./ipService');
        var ipAddress = ipService.getIPAddress();
        var appPort = 8080;
        var callbackUrl = 'http://' + ipAddress + ':' + appPort + '/api/tv/gena/1';

        var body = '';

        var getRequest = {
            host: tvHost,
            path: tvPath, //'/smp_5_', // Even tough the "controlURL" can be something like "/smp_8_", the TV seems to only respond when queried through "/smp_4_"...
            port: tvPort, //7676,
            method: 'SUBSCRIBE',
            headers: {
                //'Content-Type': 'text/xml;charset="utf-8"',
                //'Content-Length': Buffer.byteLength(body),
                //'User-Agent': 'Lavf52.104.0', //'NodeJS Samsung Remote', //'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', (Samsung Galaxy Tab)
                //'Accept': '*/*',
                //'Range': 'bytes=0-'
                //'SOAPACTION': '"urn:samsung.com:service:MainTVAgent2:1#GetAvailableActions"'
                
                'CALLBACK': '<' + callbackUrl + '>', //'<http://192.168.2.12:8080/api/tv/gena/1>',
                'NT': 'upnp:event',
                'TIMEOUT': 'Second-300'
            }
        };

        var buffer = '';

        var tvReq = http.request(getRequest, function (tvRes) {
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
        getDTVInformation: getDTVInformation,
        getAvailableActions: getAvailableActions,

        livestream: livestream,
        subscribe: subscribe
    };
}();


/**
 * Export the API Module.
 * 
 * @type {Object}
 */
module.exports = TVService;
