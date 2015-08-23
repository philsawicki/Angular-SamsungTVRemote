'use strict';

var fs = require('fs');

module.exports = function ($routeProvider) {
	$routeProvider
		.when('/', {
			template: fs.readFileSync(__dirname + './../views/page-home.html', 'utf8'),
			controller: 'HomePageController'
		})
		.when('/about', {
			template: fs.readFileSync(__dirname + './../views/page-about.html', 'utf8'),
			controller: require('./controllers/AboutPageController')
		})
		.when('/discovery', {
			template: fs.readFileSync(__dirname + './../views/page-discovery.html', 'utf8'),
			controller: 'DiscoveryPageController'
		})
		.otherwise({
			redirectTo: '/'
		});
};

module.exports.$inject = ['$routeProvider'];
