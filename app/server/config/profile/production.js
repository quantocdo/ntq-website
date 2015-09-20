'use strict';

exports._ = '/config/profile/production';
exports._factory = function() {
	return {
		debug: false,
		domain: {
			protocol: 'http://',
			base: 'ntq-solution.com.vn',
			locales: {
				en: 'www.ntq-solution.com.vn',
				ja: 'jp.ntq-solution.com.vn',
			},
		},
		port: 4000,
		db: 'mongodb://localhost/mean-dev',
		assets: {
			cdn: '//static.indie.codes',
			default: true,
			purgeCache: false,
			rev: true
		},
		upload: {
			doc: '/home/ubuntu/sites/ntq-website-v1/upload/doc'
		},
		mail: {
			to: 'sale@ntq-solution.com.vn',
			from: 'no-reply@ntq-solution.com.vn',
			region: 'us-west-2',
			accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
			secretAccessKey: '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'
		}
	};
};
