'use strict';

exports.name = '/middlewares/download';
exports.requires = [
	'@path',
	'@bluebird',
	'/models/folder',
	'/config/profile'
];
exports.factory = function(path, Promise, Folder, profile) {
	var self = {};
	var uploadDir = path.resolve(profile._root, profile.upload.doc);

	self.get = function(req, res, next) {
		var query = Folder.find({
			enabled: true
		}).sort({
			identifier: 'asc'
		}).limit(3);

		Promise.resolve(query.exec()).then(function(folders) {
			res.locals._folders = folders;

			next();
		});
	};

	self.download = function(req, res, next) {
		var folderId = req.params.folderId;
		var fileId = req.params.fileId;
		var locale = res.locals._locale;

		var query = Folder.findById(folderId);

		Promise.resolve(query.exec()).then(function(folder) {
			var file = folder.files.id(fileId);
			var filePath = path.resolve(uploadDir, file.file);
			var fileName = file.name[locale] + path.extname(filePath);

			res.download(filePath, fileName);
		});
	};

	return self;
};
