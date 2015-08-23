'use strict';

var fs = require('fs');

/**
 * "<navigation-bar>" Directive.
 */
module.exports = function () {
	return {
		restrict: 'E',
		template: fs.readFileSync(__dirname + './../../views/partial-navigationBar.html', 'utf-8'),
		controller: 'RouteController'
	};
};
