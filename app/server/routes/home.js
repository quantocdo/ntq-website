'use strict';

exports._ = '/routes/home';
exports._requires = [
	'/app',
	'/middlewares/articles',
	'/routes/shortcut'
];
exports._factory = function(app, articles, shortcut) {
	app._get('home', '/',
			articles.highlightedArticles(6),
			shortcut.render('pages/home'));
};
