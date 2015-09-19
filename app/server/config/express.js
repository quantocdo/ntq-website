'use strict';

exports._ = '/config/express';
exports._requires = [
	'@express',
	'@body-parser',
	'@reverse-route',
	'@path',
];
exports._activations = [
	'/config/assets/manager',
	'/config/view-engine',
	'/config/locale',
];
exports._factory = function(express, bodyParser, reverseRoute, path) {
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
