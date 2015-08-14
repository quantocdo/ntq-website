'use strict';

exports._ = '/app';
exports._requires = [
	'/config/express',
	'/config/profile',
];
exports._activations = [
	'/routes/home',
];
exports._factory = function(app, profile) {
	app.use(function(req, res, next) {
		res.locals._environment = profile._environment;
		next();
	});

	return app;
};
