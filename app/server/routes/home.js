'use strict';

exports._ = '/routes/home';
exports._requires = [
	'/app',
	'/middlewares/home',
];
exports._factory = function(app, home) {
	app._get('home', '/', home.render);
};
