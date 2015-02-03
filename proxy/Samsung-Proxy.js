'use strict';

var SamsungRemote = require('./Samsung-Remote'),
    SamsungKeys = require('./Samsung-Keys');

/**
 * Configure the TV Remote.
 * @type {SamsungRemote}
 */
var remote = new SamsungRemote({
    ip: '192.168.2.13' // required: IP address of the Samsung SmartTV
});

/**
 * Callbacks to fire when the associated key is pressed on the prompt.
 * @type {Object}
 */
var keyPressCallbacks = {
    // Up Arrow (Volume up):
    '\u001b[A': {
        key: '\u2191',
        name: 'Volume up',
        action: function () {
            remote.send(SamsungKeys.KEY_VOLUP, 
                function successCallback () {
                    console.log('Volume up');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    },

    // Down Arrow (Volume down):
    '\u001b[B': {
        key: '\u2193',
        name: 'Volume down',
        action: function () {
            remote.send(SamsungKeys.KEY_VOLDOWN, 
                function successCallback () {
                    console.log('Volume down');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    },

    // Right Arrow (Channel up):
    '\u001b[C': {
        key: '\u2192',
        name: 'Channel up',
        action: function () {
            remote.send(SamsungKeys.KEY_CHUP, 
                function successCallback () {
                    console.log('Channel up');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    },

    // Left Arrow (Channel down):
    '\u001b[D': {
        key: '\u2190',
        name: 'Channel down',
        action: function () {
            remote.send(SamsungKeys.KEY_CHDOWN, 
                function successCallback () {
                    console.log('Channel down');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    },

    // [Space] (Power):
    ' ': {
        key: '" "',
        name: 'Power',
        action: function () {
            remote.send(SamsungKeys.KEY_POWER,
                function successCallback () {
                    console.log('Power');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    },

    // "u" (Power on):
    'u': {
        key: 'u',
        name: 'Power on',
        action: function () {
            remote.send(SamsungKeys.KEY_POWERON,
                function successCallback () {
                    console.log('Power on');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    },

    // "d" (Power off):
    'd': {
        key: 'd',
        name: 'Power off',
        action: function () {
            remote.send(SamsungKeys.KEY_POWEROFF,
                function successCallback () {
                    console.log('Power off');
                },
                function errorCallback (error) {
                    throw new Error(error);
                }
            );
        }
    }
}

/**
 * Print the commands supported by the application.
 * @return {void}
 */
var printAvailableCommands = function () {
    var stdout = process.stdout;

    stdout.write('\n');
    stdout.write('Available commands:' + '\n');
    stdout.write('===================' + '\n');
    for (var key in keyPressCallbacks) {
        var command = keyPressCallbacks[key];
        stdout.write(' ' + command.key + '\t' + command.name + '\n');
    }
    stdout.write('\n');
};

/**
 * Handle keypress events on the prompt.
 * @return {void}
 */
var handleKeyPress = function () {
    var stdin = process.stdin;

    // Without this, we would only get streams once enter is pressed:
    stdin.setRawMode(true);

    // Resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens):
    stdin.resume();

    // No binary:
    stdin.setEncoding('utf8');

    // On any data into stdin:
    stdin.on('data', function (key) {
        if (key === '\u0003') {
            process.exit();
        }

        var keyPressCallback = keyPressCallbacks[key];
        if (typeof keyPressCallback !== 'undefined') {
            keyPressCallback.action();
        }

        // Write the key to stdout (i.e. as usual):
        //process.stdout.write(key);
    });
};



console.log('Initializing. Please wait...');

// Check if the TV is alive (i.e. ping it):
remote.isAlive(
    function TVConnectionSuccessful () {
        console.log('Successfully connected to TV.');
        printAvailableCommands();
        handleKeyPress();
    },
    function TVConnectionUnsuccessful (error) {
        console.error(error);
        throw new Error('TV is offline.');
    }
);
