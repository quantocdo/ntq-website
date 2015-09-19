'use strict';

exports._ = '/middlewares/download';
exports._requires = [
	'@path',
	'@bluebird',
	'/models/folder',
	'/config/profile'
];
exports._factory = function(path, Promise, Folder, profile) {
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
		var locale = res.locals.locale;

		var query = Folder.findById(folderId);

		Promise.resolve(query.exec()).then(function(folder) {
			var file = folder.files.id(fileId);
			var filePath = path.resolve(uploadDir, file.file);
			var fileName = file.name[locale] + path.extname(filePath);

			res.sendFile(filePath, {
				headers: {
					'Content-Disposition': 'attachment; filename="' + fileName + '"'
				}
			});
		});
	};

	return self;
};
