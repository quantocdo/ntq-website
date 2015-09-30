'use strict';

exports.name = '/config/profile/test';
exports.value = {
	domain: {
		protocol: 'http',
		base: 'indie.codes',
		locales: {
			en: 'www.ntq-solution.com.vn',
			ja: 'ja.ntq-solution.com.vn',
		},
	},
	port: 4000,
	db: 'mongodb://localhost/mean-dev',
	assets: {
		cdn: '//nighty.indie.codes',
		default: true,
		purgeCache: false,
		rev: true
	},
	upload: {
		doc: '/home/ubuntu/sites/ntq-website-v1/upload/doc'
	},
	mail: {
		to: 'sale@ntq-solution.com.vn',
		from: 'no-reply@they.online',
		region: 'us-west-2',
		accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
		secretAccessKey: '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'
	}
};
