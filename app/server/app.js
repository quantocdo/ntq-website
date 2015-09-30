'use strict';

exports.name = '/app';
exports.requires = [
	'@lodash',
	'/config/express',
	'/config/profile',
];
exports.activations = [
	'/routes/home',
	'/routes/articles',
	'/routes/download',
	'/routes/contact',
	'/routes/static',
	'/routes/error'
];
exports.factory = function(_, app, profile) {
	app.use(function(req, res, next) {
		res.locals._profile = profile;
		res.locals._environment = profile._environment;
		next();
	});

	return app;
};
