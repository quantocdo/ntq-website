'use strict';

exports._ = '/config/assets/manager';
exports._requires = [
	'@express',
	'@path',
	'/config/express',
	'/config/profile',
	'/config/assets/helper'
];
exports._factory = function(express, path, app, profile, helper) {
	// inject helper
	app.use(function(req, res, next) {
		res.locals.__assets = helper;

		next();
	});
};
