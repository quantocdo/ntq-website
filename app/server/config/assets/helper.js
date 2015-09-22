'use strict';

exports._ = '/config/assets/helper';
exports._requires = [
	'@lodash',
	'@path',
	'/config/profile',
	'/config/assets/loader'
];
exports._factory = function(_, path, profile, loader) {
	var rev = {};
	var assets = {};
	if (profile.assets.rev) {
		rev = this._require('./build/out/rev.json');
	}

	return loader.execute({
		cwd: path.resolve(profile._root, '../..'),
		assets: this._require('./build/assets.json').js,
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

		var self = {};

		var factory = function(baseDir) {
			return function(assetPath, useCDN) {
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
		self.js = factory('');

		self.scripts = function(key) {
			return assets['/js' + key] || [];
		};

		return self;
	});
};
