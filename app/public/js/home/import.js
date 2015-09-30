;(function(di) {
	'use strict';

	di.value('@jquery', window.jQuery)
			.value('@tween', window.TWEEN)
			.value('@hammer', window.Hammer)
			.factory('@ractive', [
				function() {
					window.Ractive.DEBUG = false;
					return window.Ractive;
				}
			]);
})(__('ntq'));
