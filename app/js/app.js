'use strict';


// Declare "Controllers" module for the app:
angular.module('smartTVRemote.Controllers', []);
// Declare "Directives" module for the app:
angular.module('smartTVRemote.Directives', []);
// Declare "Filters" module for the app:
angular.module('smartTVRemote.Filters', []);
// Declare "Providers" module for the app:
angular.module('smartTVRemote.Providers', []);
// Declare "Services" module for the app:
angular.module('smartTVRemote.Services', []);


// Declare app-level module which depends on views, and components:
angular.module('smartTVRemote', [
	'ngRoute',
	'ngAnimate',
	'smartTVRemote.Controllers',
	'smartTVRemote.Directives',
	'smartTVRemote.Services',
	'smartTVRemote.Providers',
	'smartTVRemote.Filters'
])
	
	// Setup the application routes:
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/page-home.html',
				controller: 'HomePageController'
			})
			.when('/about', {
				templateUrl: 'views/page-about.html',
				controller: 'AboutPageController'
			})
			.when('/discovery', {
				templateUrl: 'views/page-discovery.html',
				controller: 'DiscoveryPageController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}])

	// Disable debug info for production builds:
	.config(['$compileProvider', function ($compileProvider) {
		var isDevServer = window.location.href.indexOf('http://localhost:8000/app') !== -1;
		$compileProvider.debugInfoEnabled(!isDevServer);
	}])

	// Create a "String.format()"-like function for formatting purposes:
	.config(function() {
		if (!String.prototype.format) {
			String.prototype.format = function() {
				var args = arguments;
				return this.replace(/{(\d+)}/g, function (match, number) {
					return typeof args[number] != 'undefined'
						? args[number]
						: match
					;
				});
			};
		}
	})

	// Check online/offline status of the application
	// (From: http://stackoverflow.com/questions/16242389/how-to-check-internet-connection-in-angularjs)
	.run(['$window', '$rootScope', function ($window, $rootScope) {
		// If "navigator.onLine" is not found, assume that the app is online:
		var applicationIsOnline = true;
		if (navigator && navigator.onLine) {
			applicationIsOnline = navigator.onLine;
		}
		$rootScope.$apply(function() {
			$rootScope.applicationIsOnline = applicationIsOnline;
		});

		// Add event listeners for "online" & "offline" modes:
		if ($window.addEventListener) {
			$window.addEventListener('online', function() {
				$rootScope.$apply(function() {
					$rootScope.applicationIsOnline = true;
				});
			}, false);
			$window.addEventListener('offline', function() {
				$rootScope.$apply(function() {
					$rootScope.applicationIsOnline = false;
				});
			}, false);
		} else {
			document.body.ononline = function() {
				$rootScope.$apply(function() {
					$rootScope.applicationIsOnline = true;
				});
			};
			document.body.onoffline = function() {
				$rootScope.$apply(function() {
					$rootScope.applicationIsOnline = false;
				});
			};
		}
	}]);
