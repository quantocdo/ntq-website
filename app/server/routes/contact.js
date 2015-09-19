'use strict';

exports._ = '/routes/contact';
exports._requires = [
	'/app',
	'/routes/shortcut',
	'/middlewares/contact'
];
exports._factory = function(app, shortcut, logic) {
	var render = shortcut.render;

	app._route('contact', '/contact')
			.get(render('pages/contact'))
			.post(logic.create,
					logic.inform,
					shortcut.redirect('contact'));
};
