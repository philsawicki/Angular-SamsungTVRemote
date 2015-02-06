'use strict';

/**
 * Home Page Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('HomePageController', ['$scope', 'tvRemoteService', function ($scope, tvRemoteService) {
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
	}]);
