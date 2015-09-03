'use strict';

exports._ = '/routes/articles';
exports._requires = [
	'/app',
	'/middlewares/articles',
	'/routes/shortcut',
];
exports._factory = function(app, articles, shortcut) {
	app._get('articles', '/articles', function(req, res, next) {
		res.end('articles');
	});

	app._get('articles-detail', '/articles/:id',
			articles.identify('id'),
			articles.relatedArticles,
			shortcut.render('article-detail'));
};
