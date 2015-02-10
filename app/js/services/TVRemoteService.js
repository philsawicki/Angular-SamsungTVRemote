'use strict';

/**
 * SmartTV Remote Service.
 */
angular.module('smartTVRemote.Services')
	.factory('tvRemoteService', ['$q', '$http', '$timeout', 'appConfig', 'errorMessages', 
		function ($q, $http, $timeout, appConfig, errorMessages) {

			/**
			 * Gets all the commands supported by the connected SmartTV.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getSmartTVCommands = function () {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = '//localhost:8080/api/tv/commands';
				
				$http.get(url, {
					timeout: timeoutPromise.promise,
					cache: false // Do not cache the results, as we always want the latest data
				})
					.success(function (data) {
						if (data.length === 0) {
							// Fail the request, as no data has been received:
							deferred.reject({
								error: errorMessages.NoData.Error,
								message: errorMessages.NoData.Message
							});
						} else {
							// Parse & format the data received:
							// ...
						}
						

						// Cancel the "timeout" $timeout:
						$timeout.cancel(timeoutCountdown);
						// Cancel the "timeout" Promise:
						timeoutPromise.reject();

						
						// Resolve the Promise with data:
						deferred.resolve(data);
					})
					.error(function (data) {
						if (requestTimedOut) {
							deferred.reject({
								error: errorMessages.Timeout.Error,
								message: errorMessages.Timeout.Message.format(appConfig.JSONTimeout),
								data: data
							});
						} else {
							deferred.reject(data);
						}
					});


				// Start a $timeout which, if resolved, will fail the $http request sent (and assume a timeout):
				timeoutCountdown = $timeout(function () {
					requestTimedOut = true;
					timeoutPromise.resolve();
				}, appConfig.JSONTimeout);

				return deferred.promise;
			};

			/**
			 * Gets all the services supported by the connected SmartTV.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getTVServices = function (tvLocationUrl) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = '//localhost:8080/api/tv/details/' + encodeURIComponent(tvLocationUrl);
				
				$http.get(url, {
					timeout: timeoutPromise.promise,
					cache: false // Do not cache the results, as we always want the latest data
				})
					.success(function (data) {
						if (data.length === 0) {
							// Fail the request, as no data has been received:
							deferred.reject({
								error: errorMessages.NoData.Error,
								message: errorMessages.NoData.Message
							});
						} else {
							// Parse & format the data received:
							for (var i = 0, nbTVs = data.length; i < nbTVs; i++) {
								var connectedTVData = data[i];

								if (connectedTVData.headersParsed && connectedTVData.headersParsed['LOCATION']) {
									var location = connectedTVData.headersParsed['LOCATION'];
									console.log('LOCATION', location);
								}
							}
						}
						

						// Cancel the "timeout" $timeout:
						$timeout.cancel(timeoutCountdown);
						// Cancel the "timeout" Promise:
						timeoutPromise.reject();

						
						// Resolve the Promise with data:
						deferred.resolve(data);
					})
					.error(function (data) {
						if (requestTimedOut) {
							deferred.reject({
								error: errorMessages.Timeout.Error,
								message: errorMessages.Timeout.Message.format(appConfig.JSONTimeout),
								data: data
							});
						} else {
							deferred.reject(data);
						}
					});


				// Start a $timeout which, if resolved, will fail the $http request sent (and assume a timeout):
				timeoutCountdown = $timeout(function () {
					requestTimedOut = true;
					timeoutPromise.resolve();
				}, appConfig.JSONTimeout);

				return deferred.promise;
			};

			/**
			 * Gets all the SOAP operations supported by the connected SmartTV.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getDTVInformation = function (tvHost, tvPort, tvLocationUrl) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = '//localhost:8080/api/tv/GetDTVInformation/'
					+ encodeURIComponent(tvHost) + '/'
					+ encodeURIComponent(tvPort) + '/'
					+ encodeURIComponent(tvLocationUrl);
				
				$http.get(url, {
					timeout: timeoutPromise.promise,
					cache: false // Do not cache the results, as we always want the latest data
				})
					.success(function (data) {
						if (data.length === 0) {
							// Fail the request, as no data has been received:
							deferred.reject({
								error: errorMessages.NoData.Error,
								message: errorMessages.NoData.Message
							});
						} else {
							// Parse & format the data received:
							// ...
						}
						

						// Cancel the "timeout" $timeout:
						$timeout.cancel(timeoutCountdown);
						// Cancel the "timeout" Promise:
						timeoutPromise.reject();

						
						// Resolve the Promise with data:
						deferred.resolve(data);
					})
					.error(function (data) {
						if (requestTimedOut) {
							deferred.reject({
								error: errorMessages.Timeout.Error,
								message: errorMessages.Timeout.Message.format(appConfig.JSONTimeout),
								data: data
							});
						} else {
							deferred.reject(data);
						}
					});


				// Start a $timeout which, if resolved, will fail the $http request sent (and assume a timeout):
				timeoutCountdown = $timeout(function () {
					requestTimedOut = true;
					timeoutPromise.resolve();
				}, appConfig.JSONTimeout);

				return deferred.promise;
			};
			

			// Return the public interface for the service:
			return {
				getSmartTVCommands: getSmartTVCommands,
				getTVServices: getTVServices,
				getDTVInformation: getDTVInformation
			};
		}
	]);
