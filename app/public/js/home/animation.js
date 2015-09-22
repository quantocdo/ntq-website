;(function(di) {
	'use strict';

	di.register('/animation', [
		'@tween',
		'@bluebird',
		function(TWEEN, Promise) {
			var self = {};

			self.move = function(target, from, to, duration) {
				var defer = Promise.defer();

				new TWEEN.Tween(from)
						.to(to, duration)
						.onStart(function() {
							target.classList.add('moving');
							target.style.top = from.y + 'px';
						})
						.onUpdate(function() {
							target.style.top = this.y + 'px';
							window.scrollTo(0, 0);
						})
						.onComplete(function() {
							defer.resolve();
						})
						.start();

				return defer.promise.finally(function() {
					target.classList.remove('moving');
				});
			};

			return self;
		}
	]);
})(__('ntq.home'));
