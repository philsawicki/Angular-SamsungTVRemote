'use strict';

/**
 * Application Controller.
 * http://stackoverflow.com/questions/20909778/how-to-use-socket-io-in-express-routes
 */
module.exports = function ($scope, tvRemoteService, applicationStorageService) {
            /**
             * Check if there is a TV IP saved in the Storage Service.
             * @type {bool}
             */
            var tvIP = applicationStorageService.getConnectedTVIP();
            if (tvIP) {
                $scope.tvIPSaved = true;
            } else {
                $scope.tvIPSaved = false;
            }


            /**
             * Called on Application initialization to subscribe the client to the 
             * list of updates from the TV (e.g.: Channel Changes, Schedule Changes, etc.).
             * @return {void}
             */
            $scope.init = function () {
                console.log('ApplicationController::init()');

                if ($scope.tvIPSaved) {
                    tvRemoteService.subscribeToTVNotifications(tvIP)
                    .then(
                        function success (data) {
                            console.log('Successfully subscribed to TV Notifications.', data);
                        },
                        function error (reason) {
                            console.error('Failed to subscribe to TV Notifications.', reason);

                            if (typeof toastr !== 'undefined') {
                                toastr.error('Failed to subscribe to TV Notifications. TV might be off or unreachable.')
                            }
                        }
                    );
                }
            }
            $scope.init();


            /**
             * Called when the Controller's $scope is destroyed.
             * Used to prevent memory leaks.
             */
            $scope.$on('$destroy', function () {
                console.log('ApplicationController::$destroy()');

                tvRemoteService.unsubscribeFromTVNotifications(tvIP);
            });
        };

module.exports.$inject = ['$scope', 'tvRemoteService', 'applicationStorageService'];
