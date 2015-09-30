'use strict';
var environment = process.env.NODE_ENV || 'development';

exports.name = '/config/profile';
exports.requires = [
	'@lodash',
	'@path',
	'/config/profile/' + environment
];
exports.factory = function(_, path, target) {
	var defaults = {
		_root: path.resolve(__dirname, '../..'),
		_environment: environment,
		debug: true
	};

	return _.assign(defaults, target);
};
