'use strict';

/**
 * Unit Tests for "ApplicationConfigurationProvider".
 */
describe('ApplicationConfigurationProvider', function () {
	var appConfig = undefined;

	var constants = {
		messageKey: 'key',
		messageValue: 'value'
	};

	// Set up the module:
	beforeEach(function () {
		module('smartTVRemote.Providers', ['appConfigProvider', function (appConfigProvider) {
			appConfigProvider.set(constants.messageKey, constants.messageValue);
		}]);
    	module('smartTVRemote');
	});

	beforeEach(inject(function ($injector) {
		// Get objects to test:
		appConfig = $injector.get('appConfig');
	}));


	it('should return defined values', function () {
		var definedValue = appConfig.JSONPTimeout;

		expect(definedValue).toBeDefined();
	});

	it('should not return undefined values', function () {
		var undefinedValue = appConfig.NonExisting;

		expect(undefinedValue).toBeUndefined();
	});

	it('should return values added when calling "app.config(...)"', function () {
		var errorValue = appConfig[constants.messageKey];

		expect(errorValue).toBeDefined();
		expect(errorValue).toEqual(constants.messageValue);
	});
});
