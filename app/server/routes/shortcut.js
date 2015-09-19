'use strict';

exports._ = '/routes/shortcut';
exports._factory = function() {
	var self = {};

	self.render = function(template) {
		return function(req, res, next) {
			res.render(template);
		};
	};

	self.json = function(property) {
		return function(req, res, next) {
			res.json(res.locals[property]);
		};
	};

	return self;
};
