'use strict';

exports._ = '/config/cache';
exports._factory = function() {
	var storage = {};
	var self = {};

	self.get = function(key) {
		return storage[key];
	};

	self.put = function(key, value) {
		storage[key] = value;
	};

	return self;
};
