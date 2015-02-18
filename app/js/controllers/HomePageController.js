'use strict';

/**
 * Home Page Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('HomePageController', ['$scope', '$timeout', 'tvRemoteService', 'discoveryService', 'applicationStorageService',
		function ($scope, $timeout, tvRemoteService, discoveryService, applicationStorageService) {
			/**
			 * Check if there is a TV IP save in the Storage Service.
			 * @type {bool}
			 */
			var tvIP = applicationStorageService.getConnectedTVIP();
			if (tvIP) {
				$scope.tvIPSaved = true;
			} else {
				$scope.tvIPSaved = false;
			}


			// Get details about the connected SmartTV:
			var smartTVsPromise = discoveryService.getConnectedSamsungSmartTVs();
			smartTVsPromise.then(
				function success (data) {
					var tvDevice = data[0];
					if (tvDevice.headersParsed && tvDevice.headersParsed['LOCATION']) {
						var location = tvDevice.headersParsed['LOCATION'];

						// Get SmartTVs supported SOAP operations:
						var supportedSOAPOperationsPromise = tvRemoteService.getTVServices(location);
						supportedSOAPOperationsPromise.then(
							function success (xmlData) {
								$scope.tvFriendlyName = xmlData.root.device.friendlyName;
								$scope.tvModelName = xmlData.root.device.modelName;
							},
							function error (reason) {
								console.error(reason);
							}
						);
					}

				},
				function error (reason) {
					console.error(reason);
				}
			);
			

			/**
			 * Delay the fetching of data until at least the document has loaded, else 
			 * there will be a delay before drawing (other) elements & directives to 
			 * the screen.
			 */
			$timeout(function () {
				// Get list of Commands supported by the connected SmartTV:
				var tvCommandsPromise = tvRemoteService.getSmartTVCommands();
				tvCommandsPromise.then(
					function success (data) {
						$scope.supportedCommands = data;
					},
					function error (reason) {
						$scope.supportedCommands = [];
					}
				);

				// Get volume of the commected SmartTV:
				var volumePromise = tvRemoteService.getVolume(tvIP);
				volumePromise.then(
					function success (data) {
						console.log(data);
					},
					function error (reason) {
						console.log(reason);
					})
			}, 100);
		}
	]);
