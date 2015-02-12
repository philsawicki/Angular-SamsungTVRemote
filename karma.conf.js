module.exports = function (config) {
    config.set({
        // Base path, used to resolve "files" and "exclude" commands:
        basePath: './',

        // Testing frameworks to use:
        frameworks: ['jasmine'],

        // List of files/patterns to load in the browser:
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/components/**/*.js',
            'app/view*/**/*.js',

            'app/bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
            'app/js/**/*.js',

            'test/unit/**/*.js'
        ],

        // List of files to exclude:
        exclude: [],

        // Test result reporters to use:
        reporters: ['progress'],

        // Enable/disable colors in the output (for reporters and logs):
        colors: true,

        // Enable/disable watching files and executings tests whenever a file changes:
        autoWatch: true,

        // Browsers in which to run the tests:
        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
