'use strict';

/**
 * UPnP Discovery Service.
 */
angular.module('smartTVRemote.Services')
	.factory('discoveryService', ['$q', '$http', '$timeout', 'appConfig', 'errorMessages', 
		function ($q, $http, $timeout, appConfig, errorMessages) {

			/**
			 * Gets the Samsung SmartTVs discovered on the network through UPnP.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getConnectedSamsungSmartTVs = function () {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = '//localhost:8080/api/tv/discovery';
				
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
			 * Gets all the devices discovered on the network through UPnP.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getConnectedDevices = function () {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = '//localhost:8080/api/discovery/all';
				
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
							for (var i = 0, count = data.length; i < count; i++) {
								var deviceInfo = data[i];

								// Split on line breaks ("/r/n"):
								deviceInfo.headersFormatted = deviceInfo.headers.split( String.fromCharCode(13, 10) );
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
			

			// Return the public interface for the service:
			return {
				getConnectedSamsungSmartTVs: getConnectedSamsungSmartTVs,
				getConnectedDevices: getConnectedDevices
			};
		}
	]);
