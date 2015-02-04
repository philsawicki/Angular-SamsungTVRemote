'use strict';

angular.module('smartTVRemote.Directives')
	.directive('navigationBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/partial-navigationBar.html',
			controller: 'RouteController'
		};
	});
