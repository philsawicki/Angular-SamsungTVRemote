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
            //'app/components/**/*.js',
            //'app/view*/**/*.js',

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
        reporters: ['progress', 'coverage'],

        // Source files for 'coverage' processing (do not include tests or librairies):
        preprocessors: {
            'app/js/**/*.js': ['coverage']
        },

        // Enable/disable colors in the output (for reporters and logs):
        colors: true,

        // Enable/disable watching files and executings tests whenever a file changes:
        autoWatch: true,

        // Browsers in which to run the tests:
        browsers: ['Chrome'],

        // Karma plugins:
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        // Configure the reporters:
        coverageReporter: {
            dir: 'build/reports/coverage', // Common output directory
            reporters: [
                // Reporters not supporting the 'file' property:
                { type: 'html', subdir: 'report-html' },
                //{ type: 'lcov', subdir: 'report-lcov' },
                // Reporter supporting the 'file' property, using 'subdir' 
                // to directly output them in the 'dir' directory:
                //{ type: 'cobertura', subdir: '.', file: 'covertura.txt' },
                //{ type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                //{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                //{ type: 'text', subdir: '.', file: 'text.txt' },
                //{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
            ]
        },

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
