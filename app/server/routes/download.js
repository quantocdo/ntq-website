'use strict';

exports.name = '/routes/download';
exports.requires = [
	'/app',
	'/routes/shortcut',
	'/middlewares/download'
];
exports.factory = function(app, shortcut, folder) {
	var render = shortcut.render;

	app._get('download', '/download',
			folder.get,
			render('pages/download'));

	app._get('download.file', '/download/:folderId/:fileId', folder.download);
};
