'use strict';

exports._ = '/config/assets/helper';
exports._requires = [
	'@lodash',
	'/config/profile'
];
exports._factory = function(_, profile) {
	var self = {};

	var factory = function(baseDir) {
		return function(assetPath, useCDN) {
			useCDN = useCDN || profile.assets.default;

			var cdn = useCDN ? profile.assets.cdn : '';

			var purgeCache = profile.assets.purgeCache ? '?' + Date.now() : '';

			return cdn + baseDir + assetPath + purgeCache;
		};
	};

	self.img = factory('/img');
	self.css = factory('/css');
	self.js = factory('/js');
	self.lib = factory('/lib');

	return self;
};
