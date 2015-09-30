'use strict';

exports.name = '/middlewares/articles';
exports.requires = [
	'@bluebird',
	'/models/article'
];
exports.factory = function(Promise, Article) {
	var self = {};

	self.identify = function(identifier) {
		return function(req, res, next) {
			var id = req.params[identifier];
			var language = res.locals.locale;

			var query = Article.findOne({
				_id: id,
				enabled: true,
				languages: language,
			});

			Promise.resolve(query.exec()).then(function(article) {
				if (!article) {
					return next(new Error({
						code: 404,
					}));
				}

				res.locals._article = article;

				next();
			}).catch(next);
		};
	};

	self.relatedArticles = function(req, res, next) {
		var article = res.locals._article;
		var language = res.locals.locale;

		var query = Article.find({
			_id: {
				$ne: article._id
			},
			categories: article.categories,
			enabled: true,
			languages: language,
		}).sort({
			time: 'desc'
		}).limit(5);

		Promise.resolve(query.exec()).then(function(articles) {
			res.locals._relatedArticles = articles;

			next();
		}).catch(next);
	};

	self.highlightedArticles = function(take) {
		return function(req, res, next) {
			var language = res.locals.locale;

			var query = Article.find({
				enabled: true,
				languages: language,
			}).sort({
				highlighted: 'desc',
				time: 'desc'
			}).limit(take);

			Promise.resolve(query.exec()).then(function(articles) {
				res.locals._highlightedArticles = articles;

				next();
			}).catch(next);
		};
	};

	self.query = function(req, res, next) {
		var language = res.locals.locale;
		var limit = req.query.limit;
		var skip = req.query.skip;

		var query = Article.find({
			enabled: true,
			languages: language
		}).sort({
			time: 'desc'
		}).skip(skip).limit(limit);

		Promise.resolve(query.exec()).then(function(articles) {
			res.locals._articles = articles;

			next();
		});
	};

	return self;
};
