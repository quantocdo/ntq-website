'use strict';

exports._ = '/config/express';
exports._requires = [
	'@express',
	'@reverse-route',
	'@path',
];
exports._activations = [
	'/config/assets/manager',
	'/config/view-engine',
	'/config/locale',
];
exports._factory = function(express, reverseRoute, path) {
	var app = express();

	// use reverse-route
	reverseRoute(app);

	app.enable('trust proxy');
	app.disable('x-powered-by');

	return app;
};
