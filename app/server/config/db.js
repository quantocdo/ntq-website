'use strict';

exports._ = '/config/db';
exports._requires = [
	'@mongoose',
	'/config/profile'
];
exports._factory = function(mongoose, profile) {
	mongoose.connect(profile.db);

	return mongoose;
};
