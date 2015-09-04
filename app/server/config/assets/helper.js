'use strict';

exports._ = '/config/assets/helper';
exports._requires = [
	'@lodash',
	'/config/profile'
];
exports._factory = function(_, profile) {
	var self = {};

	var factory = function(path) {
		return function(asset, useCDN) {
			useCDN = useCDN || profile.assets.default;

			var cdn = useCDN ? profile.assets.cdn : '';

			return cdn + path + asset;
		};
	};

	self.img = factory('/img');
	self.css = factory('/css');
	self.js = factory('/js');
	self.bower = factory('/bower_components');

	return self;
};
