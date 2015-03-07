'use strict';

/**
 * "<tv-command>" Directive.
 */
angular.module('smartTVRemote.Directives')
	.directive('tvCommand', function () {
		return {
			restrict: 'E',
			scope: {
				title: '@',
				ctaTitle: '@',
				keyboardShortcut: '@',
				keyCode: '@',
				command: '@',
				icon: '@'
			},
			templateUrl: 'views/partial-tvCommand.html',
			controller: 'TVCommandController'
		};
	});
