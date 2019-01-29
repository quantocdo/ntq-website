'use strict';

exports.name = '/routes/static';
exports.requires = [
	'/app',
	'/routes/shortcut',
];
exports.factory = function(app, shortcut) {
	var render = shortcut.render;

	app._get('about', '/about',
			render('pages/about', true));

	app._get('contract-models', '/contract-models',
			render('pages/contract-models'));

	app._get('domains', '/development-domains',
			render('pages/domains', true));

	app._get('rd', '/research-and-development',
			render('pages/research-and-development'));

	app._get('services', '/services',
			render('pages/services', true));

	app._get('success-stories', '/success-stories',
			render('pages/success-stories', true));

	app._get('projects', '/projects',
			render('pages/projects', true));

	// app._get('career', '/career', render('pages/career'));
	// app._get('technologies', '/technologies', render('pages/tech'));
};
