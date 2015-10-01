'use strict';

exports.name = '/routes/shortcut';
exports.factory = function() {
	var self = {};

	self.render = function(template, dependOnLocale) {
		return function(req, res, next) {
			if (dependOnLocale) {
				return res.render(template + '_' + res.locals._locale);
			}

			res.render(template);
		};
	};

	self.json = function(property) {
		return function(req, res, next) {
			res.json(res.locals[property]);
		};
	};

	self.redirect = function(routeName, params) {
		return function(req, res, next) {
			res._redirect(routeName, params);
		};
	};

	return self;
};
