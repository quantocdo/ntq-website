'use strict';

exports.name = '/config/assets/manager';
exports.requires = [
	'@express',
	'@path',
	'/config/express',
	'/config/profile',
	'/config/assets/helper'
];
exports.factory = function(express, path, app, profile, helper) {
	// inject helper
	app.use(function(req, res, next) {
		res.locals.__assets = helper;

		next();
	});
};
