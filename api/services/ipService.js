'use strict';

var IPServices = function () {
    var getIPAddresses = function () {
        var os = require('os');
        var networkInterfaces = os.networkInterfaces();
        var networkIPAddresses = [];

        for (var i in networkInterfaces) {
            for (var j in networkInterfaces[i]) {
                var networkIPAddress = networkInterfaces[i][j];
                if (networkIPAddress.family === 'IPv4' && !networkIPAddress.internal) {
                    networkIPAddresses.push(networkIPAddress.address);
                }
            }
        }

        return networkIPAddresses;
    };

    var getIPAddress = function () {
        var ipAddresses = getIPAddresses();
        return ipAddresses[0];
    }


    return {
        getIPAddresses: getIPAddresses,
        getIPAddress: getIPAddress
    };
}();

module.exports = IPServices;
