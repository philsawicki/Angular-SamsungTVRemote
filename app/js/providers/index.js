'use strict';

var app = require('angular').module('smartTVRemote.Providers');

app.provider('appConfig', require('./ApplicationConfigurationProvider'));
app.provider('errorMessages', require('./ErrorMessagesProvider'));
app.factory('XMLToJSON', require('./XMLToJSONProvider'));
