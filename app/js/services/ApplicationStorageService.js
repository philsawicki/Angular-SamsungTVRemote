'use strict';

/**
 * Application Storage Service.
 */
module.exports = function ($window, appConfig, storageService) {
	/**
	 * Cache to bypass length I/O access to storage.
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



	/**
	 * Gets the MAC address of the associated SmartTV.
	 * @return {string} The MAC address of the associated SmartTv.
	 */
	var getConnectedTVMAC = function () {
		var key = appConfig.StorageKeys.ConnectedTVMAC;

		// Try to retrieve data from cache:
		var cachedData = _getFromCache(key);
		if (cachedData) {
			return cachedData;
		}

		var savedTVMac = storageService.getData(key);
		return savedTVMac;
	};

	/**
	 * Saves the MAC address of the associated SmartTV
	 * @param {string} tvMAC The MAC address of the associated SmartTV.
	 */
	var setConnectedTVMAC = function (tvMAC) {
		var key = appConfig.StorageKeys.ConnectedTVMAC;

		// Save the data to cache:
		_setCache(key, tvMAC);

		storageService.setData(key, tvMAC);
	};


	return {
		getConnectedTVIP: getConnectedTVIP,
		setConnectedTVIP: setConnectedTVIP,

		getConnectedTVMAC: getConnectedTVMAC,
		setConnectedTVMAC: setConnectedTVMAC
	};
};

module.exports.$inject = ['$window', 'appConfig', 'storageService'];
