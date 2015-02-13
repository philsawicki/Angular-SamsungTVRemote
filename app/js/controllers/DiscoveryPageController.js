'use strict';

/**
 * Discovery Page Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('DiscoveryPageController', ['$scope', 'discoveryService', 'tvRemoteService', 'applicationStorageService',
		function ($scope, discoveryService, tvRemoteService, applicationStorageService) {
			/**
			 * Get SmartTVs connected through UPnP.
			 * @return {void}
			 */
			var getSmartTVs = function () {
				var smartTVsPromise = discoveryService.getConnectedSamsungSmartTVs();
				smartTVsPromise.then(
					function success (data) {
						$scope.tvDevices = data;
					},
					function error (reason) {
						console.error(reason);
					}
				);
			};
			getSmartTVs();

			/**
			 * Get all devices connected through UPnP.
			 * @return {void}
			 */
			var getAllDevices = function () {
				var devicesPromise = discoveryService.getConnectedDevices();
				devicesPromise.then(
					function success (data) {
						$scope.devices = data;
					},
					function error (reason) {
						console.error(reason);
					}
				);
			};
			getAllDevices();

			/**
			 * Get currently associated TV IP.
			 * @type {string}
			 */
			$scope.associatedTVIP = applicationStorageService.getConnectedTVIP();


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
							var tvControlURL = xmlData.root.device.serviceList.service.controlURL;
							
							var getDTVInformationPromise = tvRemoteService.getDTVInformation(tvHost, tvPort, tvControlURL);
							getDTVInformationPromise.then(
								function success (data) {
									var DTVInformation = data.Envelope.Body.GetDTVInformationResponse.DTVInformation;
									console.log(DTVInformation);
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

			/**
			 * Set the given TV Device as the associated SmartTV for the application.
			 * @param  {Object} tvDevice The TV with which to associate the application.
			 * @return {void}
			 */
			$scope.saveTVIP = function (tvDevice) {
				if (tvDevice) {
					var tvLocation = tvDevice.headersParsed['LOCATION'];

					// Create a link in order to leverage the DOM Element's parsing features:
					var linkParser = document.createElement('a');
					linkParser.href = tvLocation;

					var tvIP = linkParser.hostname;
					applicationStorageService.setConnectedTVIP(tvIP);

					// Re-fetch the list of connected SmartTVs:
					getSmartTVs();
				}
			};
		}
	]);
