;(function(di) {
	'use strict';

	di.register('/animation', [
		'@tween',
		'@promise',
		function(TWEEN, Promise) {
			var self = {};

			self.move = function(target, from, to, duration, lock) {
				var defer = Promise.defer();
				var style = target.style;
				var classList = target.classList;

				new TWEEN.Tween(from)
						.to(to, duration)
						.onStart(function() {
							classList.add('moving');
							style.top = from.y + 'px';
						})
						.onUpdate(function() {
							style.top = this.y + 'px';

							if (lock) {
								window.scrollTo(0, 0);
							}
						})
						.onComplete(function() {
							defer.resolve();
						})
						.start();

				return defer.promise.finally(function() {
					classList.remove('moving');
				});
			};

			return self;
		}
	]);
})(__('ntq'));
