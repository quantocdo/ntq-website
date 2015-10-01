'use strict';

exports.name = '/config/locale';
exports.requires = [
	'@lodash',
	'@i18n',
	'@path',
	'@moment',
	'/config/express',
	'/config/profile',
];
exports.factory = function(_, i18n, path, moment, app, profile) {
	var locales = profile.domain.locales;
	var localesByDomain = _.invert(profile.domain.locales);
	var defaultLocale = profile.defaultLocale;

	i18n.configure({
		locales: _.keys(locales),
		defaultLocale: defaultLocale,
		cookie: 'acceptLanguage',
		directory: path.resolve(profile._root, 'config/translations'),
		updateFiles: false,
		objectNotation: false
	});

	app.use(i18n.init);

	app.use(function(req, res, next) {
		var locale = localesByDomain[req.hostname] || defaultLocale;

		// set locale for current context
		i18n.setLocale(locale);
		req.setLocale(locale);
		res.setLocale(locale);
		res.locals._locale = locale;

		// TODO if support more than 2 locales, this should be rework
		res.locals._anotherLocale = locale === 'en' ? 'ja' : 'en';
		res.locals._anotherLocaleDomain = locales[res.locals._anotherLocale];
		next();
	});

	app.use(function(req, res, next) {
		moment.locale(res.locals.locale);
		next();
	});

	app.use(function(req, res, next) {
		var __ = res.locals.__;

		res.locals.__ = function() {
			var translate = __.apply(null, arguments);

			if (translate) {
				return translate.trim();
			}
		};

		next();
	});
};
