'use strict';

var fs = require('fs');

/**
 * "<tv-command>" Directive.
 */
module.exports = function () {
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
		template: fs.readFileSync(__dirname + './../../views/partial-tvCommand.html', 'utf-8'),
		controller: 'TVCommandController'
	};
};
