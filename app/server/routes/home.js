'use strict';

exports.name = '/routes/home';
exports.requires = [
	'/app',
	'/middlewares/articles',
	'/routes/shortcut'
];
exports.factory = function(app, articles, shortcut) {
	app._get('home', '/',
			articles.highlightedArticles(6),
			shortcut.render('pages/home', true));
};
