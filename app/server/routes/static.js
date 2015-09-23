'use strict';

exports._ = '/routes/static';
exports._requires = [
	'/app',
	'/routes/shortcut',
];
exports._factory = function(app, shortcut) {
	var render = shortcut.render;

	app._get('about', '/about', render('pages/about'));

	// app._get('career', '/career', render('pages/career'));

	app._get('contract-models', '/contract-models', render('pages/contract-models'));

	app._get('domains', '/development-domains', render('pages/domains'));

	app._get('rd', '/research-and-development', render('pages/research-and-development'));

	app._get('services', '/services', render('pages/services'));

	app._get('success-stories', '/success-stories', render('pages/success-stories'));

	app._get('technologies', '/technologies', render('pages/tech'));
};
