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
				
				$http.get(url, { timeout: timeoutPromise.promise })
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
								message: errorMessages.Timeout.Message.format(appConfig.JSONPTimeout),
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
				}, appConfig.JSONPTimeout);

				return deferred.promise;
			};
			

			// Return the public interface for the service:
			return {
				getSmartTVCommands: getSmartTVCommands
			};
		}
	]);
