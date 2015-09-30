'use strict';

exports.name = '/models/folder';
exports.requires = [
	'@path',
	'/config/db'
];

exports.factory = function(path, db) {
	var FileShema = new db.Schema({
		name: {},
		identifier: {
			type: Number,
			required: true
		},
		file: String,
		size: Number
	});

	FileShema.virtual('type').get(function() {
		var ext = path.extname(this.file);

		if (ext === '.pdf') {
			return 'pdf';
		} else if (ext === '.doc' || ext === '.docx') {
			return 'doc';
		}

		return 'other';
	});

	var FolderSchema = new db.Schema({
		name: {},
		identifier: {
			type: Number,
			required: true
		},
		enabled: Boolean,
		_time: Number,
		files: [FileShema]
	});

	return db.model('Folder', FolderSchema);
};
