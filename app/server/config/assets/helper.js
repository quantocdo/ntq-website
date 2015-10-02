'use strict';

exports.name = '/config/assets/helper';
exports.requires = [
	'@lodash',
	'@path',
	'@assets-locator',
	'/config/profile',
	'#require'
];
exports.factory = function(_, path, locator, profile, require) {
	var rev = {};
	var assets = {};
	if (profile.assets.rev) {
		rev = require('./build/out/rev.json');
	}

	return locator.execute({
		cwd: path.resolve(profile._root, '../..'),
		assets: require('./build/assets.json').js,
		prefix: '/'
	}).then(function(result) {
		_.forEach(result, function(files, key) {
			key = key.replace('build/out', '');

			assets[key] = rev[key] ?
					[rev[key]] :
					_.map(files, function(file) {
						return file.replace('app/public/', '');
					});
		});

		var getActualFileName = function(fileName) {
			return rev[fileName] || fileName;
		};

		return function(baseDir) {
			return function(assetPath, useCDN) {
				useCDN = useCDN || profile.assets.default;

				var cdn = useCDN ? profile.assets.cdn : '';

				var purgeCache = profile.assets.purgeCache ? '?' + Date.now() : '';

				return cdn + getActualFileName(baseDir + assetPath) + purgeCache;
			};
		};
	}).then(function(factory) {
		var self = {};

		self.img = factory('/img');
		self.css = factory('/css');
		self.lib = factory('/bower_component');
		self.video = factory('/video');
		self.js = factory('');

		self.scripts = function(key) {
			return assets['/js' + key] || [];
		};

		self.cdn = function(url) {
			return profile.assets.cdn + url;
		};

		return self;
	});
};
