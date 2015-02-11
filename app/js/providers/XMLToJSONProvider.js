'use strict';

/**
 * XML to JSON conversion Provider, using "x2js".
 */
angular.module('smartTVRemote.Providers')
	.factory('XMLToJSON', [function () {
		return new X2JS();
	}]);
