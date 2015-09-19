'use strict';

exports._ = '/server/models/article';
exports._requires = [
	'/server/config/db',
	'@moment'
];
exports._factory = function(db, moment) {
	var ArticleSchema = new db.Schema({
		heading: {
			type: String,
			required: true
		},
		categories: [String],
		enabled: {
			type: Boolean,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		},
		time: {
			type: Date,
			required: true
		},
		languages: [String],
		extracts: [{
			style: {
				type: Number,
				required: true
			},
			identifier: {
				type: Number,
				required: true
			},
			image: String,
			text: String
		}],
		gallery: [String],
		bulletin: String,
		highlighted: Boolean,
		avatar: String
	});

	ArticleSchema.virtual('date').get(function() {
		return moment(this.time).format('MMM Do, YYYY');
	});

	ArticleSchema.methods = {
		toJSON: function() {
			var raw = this.toObject();

			raw.date = this.date;

			return raw;
		}
	};

	return db.model('Article', ArticleSchema);
};
