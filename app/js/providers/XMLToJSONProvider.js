'use strict';

/**
 * XML to JSON conversion Provider, using "x2js".
 */
module.exports = function () {
    var X2JS = require('./../lib/x2js-v1.1.5/xml2json.js');
    return new X2JS();
};
