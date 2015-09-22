;(function(di) {
	'use strict';

	di.register('/frame', [
		'@tween',
		function(TWEEN) {
			function animate(time) {
				TWEEN.update(time);

				requestAnimationFrame(animate);
			}

			animate();
		}
	], true);
})(__('ntq'));
