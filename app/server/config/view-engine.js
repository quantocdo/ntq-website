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

	app.set('view engine', 'ect');
	app.set('views', viewDir);

	app.engine('ect', engine.render);

	// release memory
	viewDir = null;
};
