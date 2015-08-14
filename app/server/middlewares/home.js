'use strict';

exports._ = '/middlewares/home';
exports._factory = function() {
	var self = {};

	self.render = function(req, res, next) {
		res.locals._useCache = true;
		res.render('pages/home');
	};

	return self;
};
