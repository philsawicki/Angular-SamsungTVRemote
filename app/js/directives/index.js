'use strict';

var app = require('angular').module('smartTVRemote.Directives');

app.directive('navigationBar', require('./NavigationBarDirective'));
app.directive('tvCommand', require('./TVCommandDirective'));
