'use strict';

/**
 * Home Page Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('HomePageController', ['$scope', '$timeout', 'tvRemoteService', 
		function ($scope, $timeout, tvRemoteService) {
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
			}, 100);
		}
	]);
