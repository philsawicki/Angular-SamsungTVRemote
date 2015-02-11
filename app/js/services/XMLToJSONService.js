'use strict';

/**
 * XML to JSON Service, using "x2js".
 */
angular.module('smartTVRemote.Services')
	.factory('XMLToJSONService', [function () {
		return new X2JS();
	}]);
