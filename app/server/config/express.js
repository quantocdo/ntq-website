'use strict';

exports.name = '/config/express';
exports.requires = [
	'@express',
	'@body-parser',
	'@reverse-route',
	'@path',
	'/config/profile',
];
exports.activations = [
	'/config/assets/manager',
	'/config/view-engine',
	'/config/locale',
];
exports.factory = function(express, bodyParser, reverseRoute, path, profile) {
	var app = express();

	// handle static files - development
	app.use('/bower_components', express.static(path.resolve(__dirname, '../../../bower_components')));
	app.use('/node_modules', express.static(path.resolve(__dirname, '../../../node_modules')));
	app.use('/css', express.static(path.resolve(__dirname, '../../../build/out/css')));
	app.use('/fonts', express.static(path.resolve(__dirname, '../../../build/out/fonts')));

	if (profile.assets.rev) {
		app.use('/js', express.static(path.resolve(__dirname, '../../../build/out/js')));
		app.use('/img', express.static(path.resolve(__dirname, '../../../build/out/img')));
	} else {
		app.use('/js', express.static(path.resolve(__dirname, '../../public/js')));
		app.use('/img', express.static(path.resolve(__dirname, '../../public/img')));
	}

	app.use(bodyParser.urlencoded({
		extended: false
	}));

	// use reverse-route
	reverseRoute(app);

	app.enable('trust proxy');
	app.disable('x-powered-by');

	return app;
};
