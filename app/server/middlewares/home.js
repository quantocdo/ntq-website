'use strict';

exports._ = '/middlewares/home';
exports._requires = [
	'@bluebird',
	'/server/models/article',
];
exports._factory = function(Promise, Article) {
	var self = {};

	self.render = function(req, res, next) {
		var query = Article
				.find()
				.limit(6);

		var find = Promise.promisify(query.exec, query);

		find().then(function(articles) {
			res.render('pages/home');
		}).catch(function(err) {
			next(err);
		});
	};

	return self;
};
