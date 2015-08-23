'use strict';

/**
 * Route Controller.
 */
module.exports = function ($scope, $route, $location) {
		$scope.$on('$routeChangeSuccess', function (event, current, previous) {
			$scope.controller = $route.current.controller;
		});
	};

module.exports.$inject = ['$scope', '$route', '$location'];
