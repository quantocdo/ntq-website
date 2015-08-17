'use strict';

exports._ = '/app';
exports._requires = [
	'@lodash',
	'/config/express',
	'/config/profile',
];
exports._activations = [
	'/routes/home',
];
exports._factory = function(_, app, profile) {
	app.use(function(req, res, next) {
		res.locals._environment = profile._environment;
		next();
	});

	app.use(function(req, res, next) {
		var domainParts = req.hostname.split('.');

		_.remove(domainParts, function(part) {
			return req.subdomains.indexOf(part) > -1;
		});

		res.locals._domain = domainParts.join('.');

		next();
	});

	return app;
};
