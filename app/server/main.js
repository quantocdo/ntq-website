'use strict';

exports._ = '/';
exports._requires = [
	'@path',
	'/app',
	'/config/profile'
];
exports._factory = function(path, app, profile) {
	return app.listen(profile.port, function() {
		console.log('Web started at :' + profile.port);
	});
};
