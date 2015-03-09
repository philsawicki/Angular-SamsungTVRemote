'use strict';

/**
 * TV Command Directive Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('TVCommandController', ['$scope', '$element', '$document', 'tvRemoteService', 'applicationStorageService',
		function ($scope, $element, $document, tvRemoteService, applicationStorageService) {
			var elementToDisable = $element.find('.js-remote-command-button');

			/**
			 * Keypress handler, called in order to filter the keypress for the expected 
			 * one before executing the Command.
			 * @param  {Event} e The keydown event.
			 * @return {void}
			 */
			var keypressHandler = function (event) {
				if (event.keyCode.toString() === $scope.keyCode) {
					$scope.executeCommand();

					// Prevent default behavior (otherwise the window might scroll):
					event.preventDefault();
				}
			};

			/**
			 * Send the Command to the SmartTV Remote.
			 * @return {void}
			 */
			$scope.executeCommand = function () {
				elementToDisable.prop('disabled', false);
				
				// Get the TV IP from storage:
				var tvIP = applicationStorageService.getConnectedTVIP();

				tvRemoteService.sendRemoteCommand(tvIP, $scope.command)
					.then(
						function success (data) {
							if (data.success) {
								// Display Toastr "success" message:
								var message = $scope.getMessageForCommand($scope.command);
								if (typeof toastr !== 'undefined') {
									toastr.success(message);
								} else {
									console.log(data);
								}
							} else {
								// Display Toastr "error" message:
								if (typeof toastr !== 'undefined') {
									toastr.error(data.errorMessage);
								} else {
									console.error(data);
								}
							}

							elementToDisable.prop('disabled', false);
						},
						function error (reason) {
							// Display Toastr "error" message:
							if (typeof toastr !== 'undefined') {
								toastr.error( JSON.stringify(reason) );
							} else {
								console.error(reason);
							}

							elementToDisable.prop('disabled', false);
						}
					);
			};

			/**
			 * Return a message for the given Remote command.
			 * @param  {string} command The command for which to get a message (e.g.: "KEY_VOLUP").
			 * @return {string} A message for the given Remote command.
			 */
			$scope.getMessageForCommand = function (command) {
				var message = '<strong>Success!</strong> ';

				switch (command) {
					case 'KEY_VOLUP':
						message += 'Volume raised';
						break;

					case 'KEY_VOLDOWN':
						message += 'Volume lowered';
						break;

					case 'KEY_CHUP':
						message += 'Channel Up';
						break;

					case 'KEY_CHDOWN':
						message += 'Channel Down';
						break;

					default:
						message = ''; // Reset the message
						break;
				}
				return message;
			};

			/**
			 * Attach the keypress Handler to the $document.
			 */
			$document.on('keydown', keypressHandler);

			/**
			 * Called when the Directive's $scope is destroyed.
			 * Used to remove the keypress Handler from leaking memory.
			 */
			$scope.$on('$destroy', function () {
				$document.off('keydown', keypressHandler);
			});
		}
	]);
