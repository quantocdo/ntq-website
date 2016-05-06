'use strict';

exports.name = '/config/profile/nightly';
exports.value = {
	domain: {
		protocol: 'http',
		base: 'ntq-solution.com.vn',
		locales: {
			en: 'dev.ntq-solution.com.vn',
			ja: 'dev-ja.ntq-solution.com.vn',
		},
	},
	port: 4000,
	db: 'mongodb://localhost/ntq-website',
	assets: {
		cdn: '//static.indie.codes',
		default: true,
		purgeCache: false,
		rev: true
	},
	upload: {
		doc: '/home/d/workspace/ntq/ntq-website-v1/upload/doc'
	},
	mail: {
		to: 'dzung.nguyen@ntq-solution.com.vn',
		from: 'no-reply@they.online',
		region: 'us-west-2',
		accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
		secretAccessKey: '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'
	}
};
