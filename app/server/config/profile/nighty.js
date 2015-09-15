'use strict';

exports._ = '/config/profile/nighty';
exports._factory = function() {
	return {
		host: 'nighty.ntq-solution.com.vn',
		port: 4000,
		db: 'mongodb://localhost/ntq-website-nighty',
		assets: {
			cdn: '//ntq.local/o',
			default: false,
			purgeCache: false,
		},
	};
};
