'use strict';

exports._ = '/routes/error';
exports._requires = [
	'/app',
	'/routes/shortcut'
];
exports._factory = function(app, shortcut) {
	app.use(shortcut.render('errors/404'));

	app.use(function(error, req, res, next) {
		next();
	});
};
