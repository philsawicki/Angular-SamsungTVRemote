'use strict';

/**
 * TV Command Directive Controller.
 */
angular.module('smartTVRemote.Controllers')
	.controller('TVCommandController', ['$scope', '$element', '$document', 'tvRemoteService', 
		function ($scope, $element, $document, tvRemoteService) {
			var successInfobox = $('#successInfobox'),
			    errorInfobox = $('#errorInfobox'),
			    elementToDisable = $element.find('.js-remote-command-button');

			/**
			 * Keypress handler, called in order to filter the keypress for the expected 
			 * one before executing the Command.
			 * @param  {Event} e The keydown event.
			 * @return {void}
			 */
			var keypressHandler = function (e) {
				if (e.keyCode.toString() === $scope.keyCode) {
					$scope.executeCommand();

					// Prevent default behavior (otherwise the window might scroll):
					e.preventDefault();
				}
			};

			/**
			 * Send the Command to the SmartTV Remote.
			 * @return {void}
			 */
			$scope.executeCommand = function () {
				elementToDisable.prop('disabled', false);
				
				tvRemoteService.sendRemoteCommand(undefined, $scope.command)
					.then(
						function success (data) {
							if (data.success) {
								successInfobox.find('.message').text(data.message);
								successInfobox.show();
								errorInfobox.hide();

								console.log(data);
							} else {
								errorInfobox.find('.message').text(data.errorMessage);
								errorInfobox.show();
								successInfobox.hide();

								console.error(data.errorMessage);
							}

							elementToDisable.prop('disabled', false);
						},
						function error (reason) {
							errorInfobox.find('.message').text( JSON.stringify(err) );
							errorInfobox.show();
							successInfobox.hide();

							console.error(err);

							elementToDisable.prop('disabled', false);
						}
					);
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
