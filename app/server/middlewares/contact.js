'use strict';

exports._ = '/middlewares/contact';
exports._requires = [
	'/models/message',
	'/config/mail'
];
exports._factory = function(Message, mail) {
	var self = {};

	self.create = function(req, res, next) {
		var message = new Message(req.body);

		message.save(function(err) {
			res.locals._message = message;

			next();
		});
	};

	self.inform = function(req, res, next) {
		var message = res.locals._message;
		mail.send({
			template: 'contact-inform',
			subject: 'You have new message in www.ntq-solution.com.vn',
			data: {
				body: message.body,
				subject: message.subject,
				name: message.name,
				email: message.email
			}
		}).finally(function() {
			next();
		});
	};

	return self;
};
