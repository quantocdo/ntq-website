'use strict';

exports._ = '/config/profile/development';
exports._factory = function() {
	return {
		domain: {
			protocol: 'http://',
			base: 'ntq-solution.com.vn',
			locales: {
				en: 'www.ntq-solution.com.vn',
				ja: 'ja.ntq-solution.com.vn',
			},
		},
		port: 4000,
		db: 'mongodb://localhost/ntq-website',
		assets: {
			cdn: '//static.ntq-solution.com.vn',
			default: true,
			purgeCache: true,
		},
	};
};
