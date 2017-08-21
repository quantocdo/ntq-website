;(function(di) {
	'use strict';

	di.factory('/animation', [
		'@tween',
		'@bluebird',
		function(TWEEN, Promise) {
			var self = {};

			self.move = function(target, from, to, duration, lock) {
				var classList = target.classList;
				var style = target.style;

				return new Promise(function(resolve, reject) {
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
							resolve();
						})
						.start();
				}).finally(function() {
					classList.remove('moving');
				});
			};

			return self;
		}
	]);
})(__('ntq'));
