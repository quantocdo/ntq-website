'use strict';

exports._ = '/config/assets/helper';
exports._requires = [
	'@lodash',
	'/config/profile'
];
exports._factory = function(_, profile) {
	var debug = profile.debug;
	var self = {};

	self.img = function(asset) {
		return (debug ? '/_img' : '/img') + asset;
	};

	return self;
};
