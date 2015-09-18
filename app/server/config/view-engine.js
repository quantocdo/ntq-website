'use strict';

exports._ = '/config/view-engine';
exports._requires = [
	'@ect',
	'@html-minifier',
	'@path',
	'/config/express',
	'/config/cache',
	'/config/profile',
];
exports._factory = function(ect, minifier, path, app, cache, profile) {
	var viewDir = path.resolve(profile._root, 'views');

	var engine = ect({
		watch: true,
		root: viewDir,
		ext: '.ect',
	});

	// var minOpts = {
	// 	collapseWhitespace: true,
	// 	collapseBooleanAttributes: true,
	// 	removeAttributeQuotes: true,
	// 	removeRedundantAttributes: true,
	// };
	app.set('view engine', 'ect');
	app.set('views', viewDir);

	// app.engine('ect', function(filePath, options, callback) {
	// 	var useCache = options._locals._environment === 'production' &&
	// 			options._locals._useCache;

	// 	var html;
	// 	var min;

	// 	if (useCache) {
	// 		min = cache.get(filePath);
	// 	}

	// 	if (!min) {
	// 		html = engine.render(filePath, options);
	// 		min = minifier.minify(html, minOpts);
	// 	}

	// 	if (useCache) {
	// 		cache.put(filePath, min);
	// 	}

	// 	return callback(null, min);
	// });

	app.engine('ect', engine.render);

	// release memory
	viewDir = null;
};
