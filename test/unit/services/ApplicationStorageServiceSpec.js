'use strict';

/**
 * Unit Tests for "ApplicationStorageService".
 */
describe('ApplicationStorageService', function () {
	var applicationStorageService = undefined,
	    storageService = undefined,
	    appConfig = undefined;

	var constants = {
		connectedTVIP: '192.168.2.13'
	};


	var mockStorageService = {
		setData: jasmine.createSpy(),
		getData: jasmine.createSpy()
	};

	beforeEach(module('smartTVRemote'), function ($provide) {
		$provide.value('storageService', mockStorageService);
	});


	beforeEach(inject(function ($injector) {
		// Get objects to test:
		applicationStorageService = $injector.get('applicationStorageService');
		storageService = $injector.get('storageService');
		appConfig = $injector.get('appConfig');

		spyOn(storageService, 'setData').andCallThrough();
		spyOn(storageService, 'getData').andCallThrough();

		constants.connectedTVIP = angular.fromJson(angular.toJson(constants.connectedTVIP));
	}));


	describe('TV IP storage', function () {
		it('can save and retrieve TV IP', function () {
			applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

			var storedValue = applicationStorageService.getConnectedTVIP();

			expect(storedValue).toEqual(constants.connectedTVIP);
			expect(storageService.setData).toHaveBeenCalled();
		});

		it('should not return a string', function () {
			applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

			var storedValue = applicationStorageService.getConnectedTVIP();

			expect(typeof storedValue).toEqual('string');
		});
	});

	describe('caching behavior', function () {
		describe('storing', function () {
			it('should return the cached version of values instead of calling the storage service', function () {
				applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.setData).toHaveBeenCalled();
				expect(storageService.setData.callCount).toEqual(1);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.setData.callCount).toEqual(1);
			});

			it('should use the proper cache key', function () {
				applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.setData).toHaveBeenCalled();
				expect(storageService.setData.callCount).toEqual(1);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.setData.callCount).toEqual(1);
				expect(storageService.setData.mostRecentCall.args[0]).toEqual(appConfig.StorageKeys.ConnectedTVIP);
			});
		});

		describe('retrieving', function () {
			it('should not call the storage service when data is cached', function () {
				applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.getData).not.toHaveBeenCalled();
				expect(storageService.getData.callCount).toEqual(0);
			});

			it('should call the storage service when data is not cached', function () {
				//applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.getData).toHaveBeenCalled();
				expect(storageService.getData.callCount).toEqual(1);
			});

			it('should use the proper cache key', function () {
				//applicationStorageService.setConnectedTVIP(constants.connectedTVIP);

				var storedValue = applicationStorageService.getConnectedTVIP();

				expect(storedValue).toEqual(constants.connectedTVIP);
				expect(storageService.getData).toHaveBeenCalled();
				expect(storageService.getData.callCount).toEqual(1);
				expect(storageService.getData.mostRecentCall.args[0]).toEqual(appConfig.StorageKeys.ConnectedTVIP);
			});
		});
	});
});
