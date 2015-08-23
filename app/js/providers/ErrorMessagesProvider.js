'use strict';

/**
 * Error Messages Provider.
 */
module.exports = function () {
	// Initial/default messages:
	var errorMessages = {
		NoData: {
			Error: 'NoData',
			Message: 'No data received'
		},
		Timeout: {
			Error: 'Timeout',
			Message: 'Request took longer than {0}ms'
		},
		YQL: {
			Error: 'YQLError',
			Message: 'Check "data" for details'
		}
	};

	return {
		// "errorMessages.set(...)" can only be called during "app.config(...)", as:
		//    app.config(['errorMessagesProvider', function(errorMessagesProvider) {
		//       errorMessagesProvider.set('key', 'value');
		//    }]);
		set: function (key, value) {
			errorMessages[key] = value;
		},
		$get: function () {
			return errorMessages;
		}
	};
};
