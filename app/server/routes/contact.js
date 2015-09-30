'use strict';

exports.name = '/routes/contact';
exports.requires = [
	'/app',
	'/routes/shortcut',
	'/middlewares/contact'
];
exports.factory = function(app, shortcut, logic) {
	var render = shortcut.render;

	app._route('contact', '/contact')
			.get(render('pages/contact'))
			.post(logic.create,
					logic.inform,
					shortcut.redirect('contact'));
};
