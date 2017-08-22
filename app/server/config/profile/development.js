'use strict';

exports.name = '/config/profile/development';
exports.value = {
	debug: true,
	domain: {
		protocol: 'https',
		base: 'example.com',
		locales: {
			en: 'dev.ntq-solution.com.vn',
			ja: 'dev-ja.ntq-solution.com.vn',
		},
	},
	defaultLocale: 'en',
	port: 4000,
	db: 'mongodb://localhost/ntq-website',
	assets: {
		cdn: 'https://example.com',
		default: true,
		purgeCache: true,
		// rev: true
	},
	upload: {
		doc: '../../../ntq-website-v1/upload/doc'
	},
	mail: {
		to: 'dzung.nguyen@ntq-solution.com.vn',
		from: 'no-reply@they.online',
		region: 'us-west-2',
		accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
		secretAccessKey: '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'
	}
};
