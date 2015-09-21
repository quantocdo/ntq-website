'use strict';

exports._ = '/config/assets/loader';
exports._requires = [
	'@lodash',
	'@bluebird',
	'@glob',
	'@path'
];
exports._factory = function(_, Promise, glob, path) {
	function walk(cwd, pattern) {
		var fullPath = path.resolve(cwd, pattern);

		var defer = Promise.defer();

		glob(fullPath, function(err, paths) {
			if (err) {
				return defer.reject(err);
			}

			return defer.resolve(paths);
		});

		return defer.promise;
	}

	var self = {};

	self.execute = function(options) {
		var result = {};

		var promises = _.map(options.assets, function(files, key) {
			var promises = _.map(files, function(file) {
				return walk(options.cwd, file).then(function(paths) {
					return _.map(paths, function(p) {
						var url = p.replace(options.cwd + '/', '');

						if (options.prefix) {
							url = path.resolve(options.prefix, url);
						}

						return url;
					});
				});
			});

			return Promise.all(promises).then(function(paths) {
				return _.union.apply(_, paths);
			}).then(function(paths) {
				result[key] = paths;
			});
		});

		return Promise.all(promises).then(function() {
			return result;
		});
	};

	return self;
};
