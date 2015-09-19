'use strict';

exports._ = '/routes/download';
exports._requires = [
	'/app',
	'/routes/shortcut',
	'/middlewares/download'
];
exports._factory = function(app, shortcut, folder) {
	var render = shortcut.render;

	app._get('download', '/download',
			folder.get,
			render('pages/download'));

	app._get('download.file', '/download/:folderId/:fileId', folder.download);
};
