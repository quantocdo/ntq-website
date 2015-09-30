'use strict';

exports.name = '/config/db';
exports.requires = [
	'@mongoose',
	'/config/profile'
];
exports.factory = function(mongoose, profile) {
	mongoose.connect(profile.db);

	return mongoose;
};
