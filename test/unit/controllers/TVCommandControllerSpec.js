'use strict';

/**
 * Unit Tests for "TVCommandController".
 */
describe('TVCommandController', function () {
    var $rootScope,
        $scope,
        $element,
        $document,
        tvRemoteService,
        applicationStorageService,
        createController,
        controller;

    var constants = {
        keyCode: 1234
    };

    // Set up the module:
    beforeEach(module('smartTVRemote'));

    beforeEach(inject(function ($injector) {
        // Get objects to test:
        $rootScope = $injector.get('$rootScope');
        $element = {
            find: function () {}
        }; //$injector.get('$element');
        $document = $injector.get('$document');
        tvRemoteService = {}; //$injector.get('tvRemoteService');
        applicationStorageService = $injector.get('applicationStorageService');

        // Add pre-defined Controller values:
        $scope = $rootScope.$new();
        $scope.keyCode = constants.keyCode;


        // The $controller service is used to create instances of controllers:
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('TVCommandController', {
                '$scope': $scope,
                '$element': $element,
                '$document': $document,
                'tvRemoteService': tvRemoteService,
                'applicationStorageService': applicationStorageService
            });
        };

        controller = createController();
    }));



    describe('Keypress handler', function () {
        xit('should call "executeCommand()" when proper keyCode is pressed', function () {
            var keyCodeArgument = {
                keyCode: {
                    toString: function () {
                        return constants.keyCode;
                    }
                }
            };

            spyOn($scope, 'keypressHandler').andCallThrough();

            var ret = $scope.keypressHandler(keyCodeArgument);

            expect($scope.keypressHandler).toHaveBeenCalled();
        });
    });


    describe('"Success" messages', function () {
        it('should handle "KEY_VOLUP" command', function () {
            var messageVolumeUp = $scope.getSuccessMessageForCommand('KEY_VOLUP');

            expect(messageVolumeUp).toContain('Success');
            expect(messageVolumeUp).toContain('Volume raised');
        });

        it('should handle "KEY_VOLDOWN" command', function () {
            var messageVolumeUp = $scope.getSuccessMessageForCommand('KEY_VOLDOWN');

            expect(messageVolumeUp).toContain('Success');
            expect(messageVolumeUp).toContain('Volume lowered');
        });

        it('should handle "KEY_CHUP" command', function () {
            var messageVolumeUp = $scope.getSuccessMessageForCommand('KEY_CHUP');

            expect(messageVolumeUp).toContain('Success');
            expect(messageVolumeUp).toContain('Channel Up');
        });

        it('should handle "KEY_CHDOWN" command', function () {
            var messageVolumeUp = $scope.getSuccessMessageForCommand('KEY_CHDOWN');

            expect(messageVolumeUp).toContain('Success');
            expect(messageVolumeUp).toContain('Channel Down');
        });

        it('should return empty message when given unsupported command', function () {
            var messageVolumeUp = $scope.getSuccessMessageForCommand('UNSUPPORTED_COMMAND');

            expect(messageVolumeUp).toEqual('');
        });
    });


    describe('"Error" messages', function () {
        it('should handle "Object" messages', function () {
            var object = {
                'test': 'value'
            };
            var message = $scope.getErrorMessageForCommand(object);

            expect(message).toContain('Error');
            expect(message).toContain(JSON.stringify(object));
        });

        it('should handle "reason" Object messages', function () {
            var reason = {
                'message': 'MESSAGE'
            };
            var message = $scope.getErrorMessageForCommand(reason);

            expect(message).toContain('Error');
            expect(message).toContain('MESSAGE');
        });

        it('should handle "undefined" messages', function () {
            var message = $scope.getErrorMessageForCommand(false);

            expect(message).toContain('Error');
        });
    })
});
