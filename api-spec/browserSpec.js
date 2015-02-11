var browserAPI = require('../api/browser'),
    http = require('http');


describe('The browser API', function () {
	it('should expose the "navigate" method', function () {
		var navigateMethod = browserAPI.navigate;
		expect(navigateMethod).toBeDefined();
	});

	it('should return a 404 error when not providing a URL to browse to', function (done) {
		http.get('http://localhost:8080/api/tv/browse', function (response) {
			expect(response.statusCode).toBe(404);
			done();
		});
	});
});
