'use strict';

exports._ = '/app';
exports._requires = [
	'@lodash',
	'/config/express',
	'/config/profile',
];
exports._activations = [
	'/routes/home',
	'/routes/articles',
	'/routes/download',
	'/routes/contact',
	'/routes/static',
];
exports._factory = function(_, app, profile) {
	app.use(function(req, res, next) {
		res.locals._profile = profile;
		res.locals._environment = profile._environment;
		next();
	});

	return app;
};
