'use strict';

exports._ = '/models/message';
exports._requires = [
	'@mongoose'
];
exports._factory = function(db) {
	var MessageSchema = new db.Schema({
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		subject: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		time: {
			type: Date,
			required: true,
			default: Date.now
		},
		unread: {
			type: Boolean,
			default: true
		}
	});

	return db.model('Message', MessageSchema);
};
