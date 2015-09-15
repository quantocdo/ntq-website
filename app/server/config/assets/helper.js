'use strict';

exports._ = '/config/assets/helper';
exports._requires = [
	'@lodash',
	'/config/profile'
];
exports._factory = function(_, profile) {
	var self = {};

	console.log(profile.assets.cdn);

	var factory = function(path) {
		return function(asset, useCDN) {
			useCDN = useCDN || profile.assets.default;

			var cdn = useCDN ? profile.assets.cdn : '';

			var purgeCache = profile.assets.purgeCache ? '?' + Date.now() : '';

			return cdn + path + asset + purgeCache;
		};
	};

	self.img = factory('/img');
	self.css = factory('/css');
	self.js = factory('/js');
	self.lib = factory('/bower_components');

	return self;
};
