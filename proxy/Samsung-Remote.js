'use strict';

var net = require('net'),
    exec = require('child_process').exec;


var chr = String.fromCharCode,
    base64Encode = function (string) {
        return new Buffer(string).toString('base64');
    };


var SamsungRemote = function (config) {
    if (!config.ip) {
        throw new Error('TV IP address is required.');
    }

    config.host = config.host || {
        ip: '192.168.2.12',
        mac: '00:00:00:00',
        name: 'DLNADOC/1.50 SEC_HHP_GT-P1000/1.0', //'NodeJS Samsung Remote'
    };

    config.appString = config.appString || 'iphone..iapp.samsung';
    config.tvAppString = config.tvAppString || 'iphone.UN60D6000.iapp.samsung';
    config.port = config.port || 55000;
    config.timeout = config.timeout || 60*1000;
    config.aliveTimeout = config.aliveTimeout || 3*1000;


    var _generateSocketMessageHeader = function () {
        var ipEncoded = base64Encode(config.host.ip),
            macEncoded = base64Encode(config.host.mac);

        var message = chr(0x64) +
            chr(0x00) +
            chr(ipEncoded.length) +
            chr(0x00) +
            ipEncoded +
            chr(macEncoded.length) +
            chr(0x00) +
            macEncoded +
            chr(base64Encode(config.host.name).length) +
            chr(0x00) +
            base64Encode(config.host.name);

        return chr(0x00) +
            chr(config.appString.length) +
            chr(0x00) +
            config.appString +
            chr(message.length) +
            chr(0x00) +
            message;
    };

    var _generateSocketMessageForCommand = function (command) {
        var message = chr(0x00) +
            chr(0x00) +
            chr(0x00) +
            chr(base64Encode(command).length) +
            chr(0x00) +
            base64Encode(command);

        return chr(0x00) +
            chr(config.tvAppString.length) +
            chr(0x00) +
            config.tvAppString +
            chr(message.length) +
            chr(0x00) +
            message;
    };

    this.send = function (command, successCallback, errorCallback) {
        if (!command) {
            throw new Error ('Missing command');
        }
        if (!successCallback) {
            successCallback = function () {};
        }
        if (!errorCallback) {
            errorCallback = function (error) {};
        }


        var socket = net.connect(config.port, config.ip);

        socket.setTimeout(config.timeout);

        socket.on('connect', function () {
            socket.write( _generateSocketMessageHeader() );
            socket.write( _generateSocketMessageForCommand(command) );

            socket.end();
            socket.destroy();

            successCallback();
        })
        .on('close', function () {
            //console.log('Samsung Remote Client: disconnected from ' + config.ip + ':' + config.port);
        })
        .on('data', function (data) {
            console.log('socket received:', data);
        })
        .on('end', function () {
            console.log('socket end');
        })
        .on('error', function (error) {
            var errorMessage;

            if (error.code === 'EHOSTUNREACH' || error.code === 'ECONNREFUSED') {
                errorMessage = 'Samsung Remote Client: Device is off or unreachable';
            } else {
                errorMessage = 'Samsung Remote Client: ' + error.code;
            }

            errorCallback(errorMessage);
        })
        .on('timeout', function () {
            errorCallback('timeout');
        });
    };

    this.isAlive = function (successCallback, errorCallback) {
        var hostIsWindows = /^win/.test(process.platform);
        var pingCommand = hostIsWindows ?
              'ping -n 1 ' + config.ip
            : 'ping -c 1 ' + config.ip;

        return exec(pingCommand, function (error, stdout, stderr) {
            if (error) {
                if (typeof errorCallback !== 'undefined') {
                    errorCallback(error);
                }
            } else {
                if (typeof successCallback !== 'undefined') {
                    successCallback();
                }
            }
        });
    };

    var _closeSocket = function (socket) {
        socket.end();
        socket.destroy();
    };

    this.isAliveNew = function (successCallback, errorCallback) {
        var socket = net.connect(config.port, config.ip);

        socket.setTimeout(config.aliveTimeout);

        socket.on('connect', function () {
            //socket.write( _generateSocketMessageHeader() );
            //socket.write( _generateSocketMessageForCommand(command) );

            _closeSocket(socket);

            successCallback();
        })
        .on('close', function () {
            //console.log('Samsung Remote Client: disconnected from ' + config.ip + ':' + config.port);
        })
        .on('data', function (data) {
            console.log('socket received:', data);

            _closeSocket(socket);

            successCallback();
        })
        .on('end', function () {
            console.log('socket end');
        })
        .on('error', function (error) {
            _closeSocket(socket);

            var errorMessage;
            if (error.code === 'EHOSTUNREACH' || error.code === 'ECONNREFUSED') {
                errorMessage = 'Samsung Remote Client: Device is off or unreachable';
            } else {
                errorMessage = 'Samsung Remote Client: ' + error.code;
            }

            errorCallback(errorMessage);
        })
        .on('timeout', function () {
            _closeSocket(socket);

            var errorMessage = 'Timeout while trying to reach TV.';
            errorCallback(errorMessage);
        });
    };
};


module.exports = SamsungRemote;
