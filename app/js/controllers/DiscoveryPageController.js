'use strict';

/**
 * Discovery Page Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('DiscoveryPageController', ['$scope', 'discoveryService', 'tvRemoteService', 
		function ($scope, discoveryService, tvRemoteService) {

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


		/**
		 * Get the "description.xml" file for the given TV Device.
		 * @param  {Object} tvDevice The TV for which to get the "description.xml" file.
		 * @return {void}
		 */
		$scope.getTVDetails = function (tvDevice) {
			if (tvDevice.headersParsed && tvDevice.headersParsed['LOCATION']) {
				var location = tvDevice.headersParsed['LOCATION'];

				// Get SmartTVs supported SOAP operations:
				var supportedSOAPOperationsPromise = tvRemoteService.getTVServices(location);
				supportedSOAPOperationsPromise.then(
					function success (xmlData) {
						var parser = document.createElement('a');
						parser.href = location;

						var tvHost = parser.hostname;
						var tvPort = parser.port;

						var controlURL = '';
						var regex = new RegExp('<controlURL>(.+?)<\/controlURL>');
						var m = regex.exec(xmlData);
						if (m !== null) {
							controlURL = m[1];
						}
						

						var getDTVInformationPromise = tvRemoteService.getDTVInformation(tvHost, tvPort, controlURL);
						getDTVInformationPromise.then(
							function success (data) {
								console.log(data);
							},
							function error (reason) {
								console.error(reason);
							}
						);
					},
					function error (reason) {
						console.error(reason);
					}
				);
			}
		};
	}]);
