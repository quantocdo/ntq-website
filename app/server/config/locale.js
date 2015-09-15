'use strict';

exports._ = '/config/locale';
exports._requires = [
	'@lodash',
	'@i18n',
	'@path',
	'/config/express',
	'/config/profile',
];
exports._factory = function(_, i18n, path, app, profile) {
	i18n.configure({
		locales: ['en', 'ja'],
		defaultLocale: 'en',
		cookie: 'acceptLanguage',
		directory: path.resolve(profile._root, 'config/translations'),
		updateFiles: false,
		objectNotation: true
	});

	app.use(i18n.init);

	app.use(function(req, res, next) {
		next();
	});

	// app.use(function(req, res, next) {
	// 	var domainParts = req.hostname.split('.');

	// 	console.log(domainParts);

	// 	_.remove(domainParts, function(part) {
	// 		return req.subdomains.indexOf(part) > -1;
	// 	});

	// 	res.locals._domain = domainParts.join('.');

	// 	console.log(req.subdomains);

	// 	next();
	// });
};
