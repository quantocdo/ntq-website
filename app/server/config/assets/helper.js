'use strict';

exports._ = '/config/assets/helper';
exports._requires = [
	'@lodash',
	'/config/profile'
];
exports._factory = function(_, profile) {
	var rev = {};
	var assets = {};
	if (profile.assets.rev) {
		rev = this._require('./build/out/rev.json');
	}

	var config = this._require('./build/assets.json');

	_.forEach(config.js, function(files, key) {
		key = key.replace('build/out', '');

		assets[key] = (rev[key] && [rev[key]]) || _.map(files, function(file) {
			return file.replace('app/public', '');
		});
	});

	var getActualFileName = function(fileName) {
		return rev[fileName] || fileName;
	};

	var self = {};

	var factory = function(baseDir, startWithSlash) {
		return function(assetPath, useCDN) {
			if (startWithSlash && assetPath.indexOf('/') !== 0) {
				assetPath = '/' + assetPath;
			}

			useCDN = useCDN || profile.assets.default;

			var cdn = useCDN ? profile.assets.cdn : '';

			var purgeCache = profile.assets.purgeCache ? '?' + Date.now() : '';

			return cdn + getActualFileName(baseDir + assetPath) + purgeCache;
		};
	};

	self.img = factory('/img');
	self.css = factory('/css');
	self.lib = factory('/bower_component');
	self.video = factory('/video');
	self.js = factory('', true);

	self.files = function(key) {
		return assets['/js' + key];
	};

	return self;
};
