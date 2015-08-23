'use strict';

/**
 * SmartTV Remote Service.
 */
module.exports = function ($q, $http, $timeout, appConfig, errorMessages, XMLToJSON) {
			// URL of the API Server:
			var APIServer = appConfig.APIServer;

			/**
			 * Send the given Remote command to the connected SmartTV.
			 * @param {string} tvIP    The IP of the connected SmartTV.
			 * @param {string} command The command to send to the connected SmartTV (e.g.: "KEY_VOLUP").
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var sendRemoteCommand = function (tvIP, command) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = APIServer + 'api/tv/command/'
					+ (tvIP === null || typeof tvIP === 'undefined' ? '' : tvIP + '/')
					+ command;
				
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
			 * Gets all the commands supported by the connected SmartTV.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getSmartTVCommands = function () {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = APIServer + 'api/tv/commands';
				
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
			 * @param {string} tvLocationUrl The "LOCATION" Header of the SmartTV.
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getTVServices = function (tvLocationUrl) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = APIServer + 'api/tv/details/' + encodeURIComponent(tvLocationUrl);
				
				$http.get(url, {
					timeout: timeoutPromise.promise,
					cache: false, // Do not cache the results, as we always want the latest data
					transformResponse: function (data) {
						// Convert the data to JSON:
						var json = XMLToJSON.xml_str2json(data);
						return json;
					}
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
			 * Gets all the SOAP operations supported by the connected SmartTV.
			 * @param {string}     tvHost        The SmartTV Host (eg: "192.168.2.13").
			 * @param {string|int} tvPort        The SmartTV communication Port number (eg: 7676).
			 * @param {string}     tvLocationUrl The SmartTV "LOCATION" Header (eg: "/smp_4_").
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getDTVInformation = function (tvHost, tvPort, tvLocationUrl) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = APIServer + 'api/tv/GetDTVInformation/'
					+ encodeURIComponent(tvHost) + '/'
					+ encodeURIComponent(tvPort) + '/'
					+ encodeURIComponent(tvLocationUrl);
				
				$http.get(url, {
					timeout: timeoutPromise.promise,
					cache: false, // Do not cache the results, as we always want the latest data
					transformResponse: function (data) {
						// Convert the data to JSON:
						var json = XMLToJSON.xml_str2json(data);
						return json;
					}
				})
					.success(function (data) {
						if (!data) {
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
			 * Gets the current volume of the connected SmartTV.
			 * @param {string} tvHost The SmartTV Host (eg: "192.168.2.13").
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var getVolume = function (tvHost) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = APIServer + 'api/tv/GetVolume/'
					+ (tvHost === null || typeof tvHost === 'undefined' ? '' : tvHost);
				
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
			 * Gets all the SOAP operations supported by the connected SmartTV.
			 * @param {string}     tvHost        The SmartTV Host (eg: "192.168.2.13").
			 * @param {string|int} tvPort        The SmartTV communication Port number (eg: 7676).
			 * @param {string}     tvLocationUrl The SmartTV "LOCATION" Header (eg: "/smp_4_").
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var subscribeToTVNotifications = function (tvHost, tvPort, tvLocationUrl) {
				var deferred = $q.defer();
				var timeoutPromise = $q.defer();
				var requestTimedOut = false;
				var timeoutCountdown = undefined;
				
				var url = APIServer + 'api/tv/subscribe/';
				url += encodeURIComponent(tvHost)
				url += (typeof tvPort === 'undefined') ? '' : '/' + encodeURIComponent(tvPort)
				url += (typeof tvLocationUrl === 'undefined') ? '' : '/' + encodeURIComponent(tvLocationUrl);
				
				$http.get(url, {
					timeout: timeoutPromise.promise,
					cache: false, // Do not cache the results, as we always want the latest data
					//transformResponse: function (data) {
					//	// Convert the data to JSON:
					//	var json = XMLToJSON.xml_str2json(data);
					//	return json;
					//}
				})
					.success(function (data) {
						//if (!data) {
						//	// Fail the request, as no data has been received:
						//	deferred.reject({
						//		error: errorMessages.NoData.Error,
						//		message: errorMessages.NoData.Message
						//	});
						//} else {
						//	// Parse & format the data received:
						//	// ...
						//}
						deferred.resolve({});
						

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
			 * @param {string}     tvHost        The SmartTV Host (eg: "192.168.2.13").
			 * @param {string|int} tvPort        The SmartTV communication Port number (eg: 7676).
			 * @param {string}     tvLocationUrl The SmartTV "LOCATION" Header (eg: "/smp_4_").
			 * @return {Deferred.promise} A promise to be resolved when the request is successfully received.
			 */
			var unsubscribeFromTVNotifications = function (tvHost, tvPort, tvLocationUrl) {
				console.log('TODO: Unsubscribe from TV Notfications @ %s, %s, %s', tvHost, tvPort, tvLocationUrl);
			};
			

			// Return the public interface for the service:
			return {
				sendRemoteCommand: sendRemoteCommand,
				getSmartTVCommands: getSmartTVCommands,
				getTVServices: getTVServices,
				getDTVInformation: getDTVInformation,

				getVolume: getVolume,

				subscribeToTVNotifications: subscribeToTVNotifications,
				unsubscribeFromTVNotifications: unsubscribeFromTVNotifications
			};
		};

module.exports.$inject = ['$q', '$http', '$timeout', 'appConfig', 'errorMessages', 'XMLToJSON'];
