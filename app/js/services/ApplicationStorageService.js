'use strict';

/**
 * Application Storage Service.
 */
angular.module('smartTVRemote.Services')
	.factory('applicationStorageService', ['$window', 'appConfig', 'storageService', 
		function ($window, appConfig, storageService) {

			/**
			 * Cache to bypass I/O access to storage.
			 * @type {Object}
			 */
			var _cache = {};


			/**
			 * Gets data from cache.
			 * @param  {string} key The key uniquely identifying the data to retrieve from cache.
			 * @return {*}          The cached data (or "undefined" if nothing found).
			 */
			var _getFromCache = function (key) {
				return _cache[key];
			};

			/**
			 * Saves data to cache.
			 * @param {string} key   The key uniquely identifying the data to save to cache.
			 * @param {*}      value The data to save to cache.
			 */
			var _setCache = function (key, value) {
				_cache[key] = value;
			};



			/**
			 * Gets the IP of the connected SmartTV.
			 * @return {string} The IP of the connected SmartTV.
			 */
			var getConnectedTVIP = function () {
				var key = appConfig.StorageKeys.ConnectedTVIP;

				// Try to retrieve data from cache:
				var cachedData = _getFromCache(key);
				if (cachedData) {
					return cachedData;
				}

				var savedSortingField = storageService.getData(key);
				return savedSortingField;
			};

			/**
			 * Saves the IP of the connected SmartTV.
			 * @param {string} tvIP The IP of the connected SmartTV.
			 */
			var setConnectedTVIP = function (tvIP) {
				var key = appConfig.StorageKeys.ConnectedTVIP;

				// Save the data to cache:
				_setCache(key, tvIP);

				storageService.setData(key, tvIP);
			};


			return {
				getConnectedTVIP: getConnectedTVIP,
				setConnectedTVIP: setConnectedTVIP
			};
		}
	]);
