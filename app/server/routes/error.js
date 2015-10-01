'use strict';

exports.name = '/routes/error';
exports.requires = [
	'/app',
	'/routes/shortcut'
];
exports.factory = function(app, shortcut) {
	app.use(shortcut.render('errors/404'));

	app.use(function(error, req, res, next) {
		next(error);
	});
};
