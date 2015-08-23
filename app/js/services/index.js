'use strict';

var app = require('angular').module('smartTVRemote.Services');

app.factory('applicationStorageService', require('./ApplicationStorageService'));
app.factory('discoveryService', require('./DiscoveryService'));
app.factory('storageService', require('./StorageService'));
app.factory('tvRemoteService', require('./TVRemoteService'));
