'use strict';

/**
 * Discovery Page Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('DiscoveryPageController', ['$scope', 'discoveryService', function ($scope, discoveryService) {
		// Get SmartTVs connected through UPnP:
		var smartTVsPromise = discoveryService.getConnectedSamsungSmartTVs();
		smartTVsPromise.then(
			function success (data) {
				$scope.tvDevices = data;
			},
			function error (reason) {
				console.error(reason);
			}
		);

		// Get all devices connected through UPnP:
		var devicesPromise = discoveryService.getConnectedDevices();
		devicesPromise.then(
			function success (data) {
				$scope.devices = data;
			},
			function error (reason) {
				console.error(reason);
			}
		);
	}]);
