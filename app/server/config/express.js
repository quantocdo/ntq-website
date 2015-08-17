'use strict';

exports._ = '/config/express';
exports._requires = [
	'@express',
	'@reverse-route',
];
exports._activations = [
	'/config/view-engine',
];
exports._factory = function(express, reverseRoute) {
	var app = express();

	// use reverse-route
	reverseRoute(app);

	app.enable('trust proxy');
	app.disable('x-powered-by');

	return app;
};
