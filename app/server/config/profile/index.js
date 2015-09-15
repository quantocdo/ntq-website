'use strict';
var environment = process.env.NODE_ENV || 'development';

exports._ = '/config/profile';
exports._requires = [
	'@lodash',
	'@path',
	'/config/profile/' + environment
];
exports._factory = function(_, path, target) {
	var defaults = {
		_root: path.resolve(__dirname, '../..'),
		_environment: environment,
		debug: true,
		assets: {
			cdn: '//ntq.local/o',
			default: false,
		},
	};

	return _.assign(defaults, target);
};
