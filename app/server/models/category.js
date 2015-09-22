'use strict';

exports._ = '/models/category';
exports._requires = [
	'/config/db'
];
exports._factory = function(db) {
	var CategorySchema = new db.Schema({
		name: {},
		enabled: {
			type: Boolean,
			required: true
		},
		identifier: {
			type: Number,
			required: true
		},
		media: Boolean
	});

	return db.model('Category', CategorySchema);
};
