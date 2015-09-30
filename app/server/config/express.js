'use strict';

exports.name = '/config/express';
exports.requires = [
	'@express',
	'@body-parser',
	'@reverse-route',
	'@path',
];
exports.activations = [
	'/config/assets/manager',
	'/config/view-engine',
	'/config/locale',
];
exports.factory = function(express, bodyParser, reverseRoute, path) {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: false
	}));

	// use reverse-route
	reverseRoute(app);

	app.enable('trust proxy');
	app.disable('x-powered-by');

	return app;
};
