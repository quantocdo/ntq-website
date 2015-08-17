'use strict';

exports._ = '/server/config/db';
exports._requires = [
	'@mongoose',
	'/config/profile'
];
exports._factory = function(mongoose, profile) {
	mongoose.connect(profile.db);

	return mongoose;
};
