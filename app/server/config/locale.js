'use strict';

exports._ = '/config/locale';
exports._requires = [
	'@lodash',
	'@i18n',
	'@path',
	'@moment',
	'/config/express',
	'/config/profile',
];
exports._factory = function(_, i18n, path, moment, app, profile) {

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
		req.setLocale('en');
		next();
	});

	app.use(function(req, res, next) {
		moment.locale('en');
		next();
	});
};
