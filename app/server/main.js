'use strict';

exports.name = '/';
exports.requires = [
	'@path',
	'/app',
	'/config/profile'
];
exports.factory = function(path, app, profile) {
	return app.listen(profile.port, function() {
		console.log('Web started at :' + profile.port);
	});
};
