REM Runs automated tasks commonly used during development, such as:
REM   * Starting API server.
REM   * Starting HTTP server.
REM   * Gulp Watch-ing file changes to build /dist project files.
REM   * Karma Watch-ing file changes to run automated unit tests on the Angular Front-End.
REM   * Karma Watch-ing file changes to run automated unit tests on the API Server.

start cmd /k "node server.js"
start cmd /k "npm start"
start cmd /k "gulp watch"
start cmd /k "npm test"
start cmd /k "npm test-api"

exit
