'use strict';

var angular = require('angular');
require('angular-route');
require('angular-animate');


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

require('./controllers');
require('./directives');
require('./filters');
require('./providers');
require('./services');


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
	.config(require('./routes'))

	// Disable debug info for production builds:
	.config(['$compileProvider', 'appConfigProvider', function ($compileProvider, appConfigProvider) {
		var isDevServer = window.location.href.indexOf('http://localhost:8000/dist') !== -1;

		// Disable debug information on production
		$compileProvider.debugInfoEnabled(!isDevServer);

		if (!isDevServer) {
			// If the current environment is not the development one, assume that the API Server is on the same host:
			appConfigProvider.set('APIServer', '/');
		}
	}])

	// Create a "String.format()"-like function for formatting purposes:
	.config(function () {
		if (!String.prototype.format) {
			String.prototype.format = function () {
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

	// Configure default "Toastr" settings:
	.config(function () {
		if (typeof toastr !== 'undefined') {
			toastr.options = {
				'closeButton': true,
				'closeHtml': '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>',
				//'debug': true,
				'newestOnTop': false,
				//'progressBar': true,
				'positionClass': 'toast-bottom-left',
				//'preventDuplicates': false,
				//'onclick': null,
				//'showDuration': '300',
				//'hideDuration': "1000",
				'timeOut': '2000', // 5000
				//'extendedTimeOut': "1000",
				//'showEasing': "swing",
				//'hideEasing': "linear",
				//'showMethod': "fadeIn",
				//'hideMethod': "fadeOut"
				toastClass: 'alert alert-dismissible',
				iconClasses: {
					error: 'alert-danger',
					info: 'alert-info',
					success: 'alert-success',
					warning: 'alert-warning'
				}
			}
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
		$rootScope.$apply(function () {
			$rootScope.applicationIsOnline = applicationIsOnline;
		});

		// Add event listeners for "online" & "offline" modes:
		if ($window.addEventListener) {
			$window.addEventListener('online', function () {
				$rootScope.$apply(function () {
					$rootScope.applicationIsOnline = true;
				});
			}, false);
			$window.addEventListener('offline', function () {
				$rootScope.$apply(function () {
					$rootScope.applicationIsOnline = false;
				});
			}, false);
		} else {
			document.body.ononline = function () {
				$rootScope.$apply(function () {
					$rootScope.applicationIsOnline = true;
				});
			};
			document.body.onoffline = function () {
				$rootScope.$apply(function () {
					$rootScope.applicationIsOnline = false;
				});
			};
		}
	}]);
