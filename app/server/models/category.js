'use strict';

exports.name = '/models/category';
exports.requires = [
	'/config/db'
];
exports.factory = function(db) {
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
