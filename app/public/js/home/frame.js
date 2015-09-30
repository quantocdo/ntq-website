;(function(di) {
	'use strict';

	di.factory('/frame', [
		'@tween',
		function(TWEEN) {
			function animate(time) {
				TWEEN.update(time);

				requestAnimationFrame(animate);
			}

			animate();
		}
	]);
})(__('ntq'));
